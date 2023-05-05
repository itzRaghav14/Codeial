const nodemailer = require('../config/nodemailer');

// this is another way of exporting a method
exports.newComment = (comment) => {
    console.log('inside new comment mailer');

    nodemailer.transporter.sendMail({
        from : 'raghavgoel1453@gmail.com',
        to : comment.user.email,
        subject : 'New comment published!',
        html : '<h1> Yup, your comment is now published </h1>'
    }, (err, info) => {
        if(err) {console.log(`Error in sending mail (comments_mailer) : ${err}`); return;}
        console.log('Message sent ', info);
        return;
    });
}