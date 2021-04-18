// IMPORT Routes
const adminRoutes = require('./admin.route');
const orderRoutes = require('./order.route');
const serviceRoutes = require('./service.route');
const reviewRoutes = require('.//review.route');
// IMPORT Middleware
const bindAuthUser = require('../middlewares/bindUserRequest.middleware');

const generateMethods = (methods) => {
    let method = "";
    for (let key in methods) {
        if (methods[key] === true) {
            method = key;
        }
    }
    return method;
};

const generateStacks = (handler) => {
    let nestedRoutes = handler.stack;
    if (nestedRoutes) {
        return nestedRoutes.map((stack) => ({
            path: stack.route.path,
            method: generateMethods(stack.route.methods),
            structure: stack.route.stack.map((st) => st.name),
        }));
    }
    return null;
};


const routes = [
    {
        name: "Orders",
        path: "/orders",
        handler: orderRoutes
    },
    {
        name: "Services",
        path: "/services",
        handler: serviceRoutes
    },
    {
        name: "REVIEW",
        path: "/reviews",
        handler: reviewRoutes
    },
    {
        name: "Admin Section",
        path: "/admins",
        handler: adminRoutes
    },
    {
        name: "All Route List",
        path: "/routes",
        handler: (req, res) => {
            let getAllRoutes = routes.map((route) => {
                return {
                    name: route.name,
                    path: route.path,
                    routes: generateStacks(route.handler),
                };
            });
            res.json({
                routes: getAllRoutes,
                totalRootRoutes: getAllRoutes.length - 2,
            });
        },
    },
    {
        path: "/",
        handler: (req, res) => {
            res.json({
                title: "conference-events-server",
            });
        },
    },
    {
        name: "Not Found",
        path: "*",
        handler: (req, res) => {
            res.status(404).json({ error: "Endpoint Not Found" });
        },
    },
    {
        name: "Error Boundary",
        path: "*",
        handler: (error, req, res, next) => {
            if (error.status === 404) {
                return res.status(404).json({ error: "Endpoint Not Found" });
            }
            process.env.NODE_ENV === "developement" && console.error(error.message);
            return res.status(500).json({ error: error.message });
        },
    },
];

module.exports = (app) => {
    routes.forEach((route) => {
        if (route.path === "/") {
            app.get(route.path, route.handler);
        } else {
            app.use(route.path, route.handler);
        }
    });
};

// if need access from outside uncomment below line
// exports.routes = routes.map(r => r);
