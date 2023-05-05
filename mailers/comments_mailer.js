const nodemailer = require('../config/nodemailer');

// this is another way of exporting a method
exports.newComment = (comment) => {
    let htmlString = nodemailer.renderTemplate({comment : comment}, '/comments/new_comment.ejs');

    nodemailer.transporter.sendMail({
        from : 'raghavgoel1453@gmail.com',
        to : comment.user.email,
        subject : 'New comment published!',
        html : htmlString
    }, (err, info) => {
        if(err) {console.log(`Error in sending mail (comments_mailer) : ${err}`); return;}
        console.log('Message sent', info.envelope);
        return;
    });
}