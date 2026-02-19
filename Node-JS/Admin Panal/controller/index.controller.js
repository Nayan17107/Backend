exports.dashboardPage = async (req, res) => {
    try {
        return res.render("dashboard");
    } catch (error) {
        console.log(error)
    }
};
