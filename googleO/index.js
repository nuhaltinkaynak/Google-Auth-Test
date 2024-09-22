const express = require("express");
const passport = require("passport");
const session = require("express-session");
require("./auth");

const app = express();

app.use(session({   
 secret: "123" }));
app.use(passport.initialize());
app.use(passport.session());

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

app.get("/login",   
 (req, res) => {
    res.send("<a href='/auth/google'>Login with Google</a>");
});

app.get("/auth/google",
    passport.authenticate("google", { scope:   
 ["profile", "email"] })
);

app.get("/auth/google/callback",
    passport.authenticate("google", {
        successRedirect: "/profile",
        failureRedirect:   
 "/failure",
    })
);

app.get("/profile", isLoggedIn, (req, res) => {
    res.send(`Welcome ${req.user.displayName} <a href="/logout">Logout</a>`);
});

app.get("/failure", (req, res) => {
    res.send("Something went wrong");
});

app.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) return;
        res.send("logged out.."); // Redirect to the homepage or any other desired page after logout
    });
});

app.listen(8080, console.log("running on port 8080"));