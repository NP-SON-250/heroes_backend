
import sendMail from "../helper/sendMail";

export const sendEmailToAdmin = (email, name) => {
    const emailTemplate = {
        emailTo: email,
        subject: "Welcome to Hover Ai - Exciting Times Ahead!",
        message: `<h1>Dear Admin, ${name}</h1><br/>
    Thank you for joining us at Hover Ai! We're eager to embark on this journey together, bringing you the latest and greatest. Stay tuned for more updates and opportunities to come.<br/>
    Warm regards,<br/>
    The Hover Ai Team<br/>`,
    };

    sendMail(emailTemplate)
};

export const sendResetEmail = (email, name, link, resetCode) => {
    const emailTemplate = {
        emailTo: email,
        subject: "Password reset Code",
        message: `<h1>Dear ${name},</h1></br>
        <h3>Reset Code: ${resetCode}</h3><br>
        To reset your password click this link: ${link} <br>
        For any reason if the link is not working you can click reset password button below.<br><br>
        <a href="${link}" style="background-color:#ad498c;width:8rem;height:2rem;padding:8px;color:white;font-weight:600;border-radius:10px;text-decoration:none;">
        Reset Password
        </a><br><br>
        Reset password code is only valid for <b>15 minutes</b>.
        <br/><br/>
        The Hover Ai Team<br/>`,
    };

    sendMail(emailTemplate);

};