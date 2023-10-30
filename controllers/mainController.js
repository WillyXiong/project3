exports.about = (req, res) => {
    console.log("Rendering the about page.");
    res.render('./about.ejs');
};

exports.contact = (req, res) => {
    console.log("Rendering the contact page.");
    res.render('./contact.ejs');
};
