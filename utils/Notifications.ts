const nodemailer = require('nodemailer')

// Create a transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PW,
  },
})

// Function to send an email
const sendEmailToAirtaska = async (to, subject, text, email) => {
  try {
    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to,
      subject,
      text,
    }

    await transporter.sendMail(mailOptions)
    console.log('Email sent successfully')
  } catch (error) {
    console.error('Error sending email:', error)
  }
}

const newOfferEmail = async ({ email, taskTitle }) => {
  try {
    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: 'New Offer',
      text: `You have received a new offer on ${taskTitle}`,
    }

    await transporter.sendMail(mailOptions)
    console.log('Email sent successfully')
  } catch (error) {
    console.error('Error sending email:', error)
  }
}

const acceptOfferEmail = async ({ email, taskTitle, name }) => {
  try {
    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: 'Offer Accepted',
      text: `${name} has accepted your offer on ${taskTitle}. You can now start working on it!`,
    }

    await transporter.sendMail(mailOptions)
    console.log('Email sent successfully')
  } catch (error) {
    console.error('Error sending email:', error)
  }
}
const withdrawOfferEmail = async ({ email, taskTitle, name }) => {
  try {
    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: 'Offer Withdrawal',
      text: `${name} has withdrawn offer made on ${taskTitle}`,
    }

    await transporter.sendMail(mailOptions)
    console.log('Email sent successfully')
  } catch (error) {
    console.error('Error sending email:', error)
  }
}
const withdrawFromTaskEmail = async ({ email, taskTitle, name }) => {
  try {
    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: 'Withdrawal from assignment',
      text: `${name} has withdrawn from ${taskTitle}, the assignment is now open to other freelancers.`,
    }

    await transporter.sendMail(mailOptions)
    console.log('Email sent successfully')
  } catch (error) {
    console.error('Error sending email:', error)
  }
}
const cancelTaskEmail = async ({ email, taskTitle }) => {
  try {
    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: 'Task Cancelled',
      text: `${taskTitle} is no longer available, it has been cancelled by the student.`,
    }

    await transporter.sendMail(mailOptions)
    console.log('Email sent successfully')
  } catch (error) {
    console.error('Error sending email:', error)
  }
}
const updateOfferEmail = async ({ email, taskTitle, name }) => {
  try {
    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: 'Offer Update',
      text: `${name} has updated offer made on ${taskTitle}`,
    }

    await transporter.sendMail(mailOptions)
    console.log('Email sent successfully')
  } catch (error) {
    console.error('Error sending email:', error)
  }
}
const requestPaymentEmail = async ({ email, taskTitle, name }) => {
  try {
    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: 'Payment Requested',
      text: `${name} has requested payment on ${taskTitle}. Confirm everything is done then release payment.`,
    }

    await transporter.sendMail(mailOptions)
    console.log('Email sent successfully')
  } catch (error) {
    console.error('Error sending email:', error)
  }
}

const releasePaymentAdminEmail = async ({
  accountName,
  accountNumber,
  taskTitle,
}) => {
  try {
    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: process.env.NODEMAILER_EMAIL,
      subject: 'Release Payment',
      text: `Payment needs to be released for ${taskTitle}. Account Holder Name: ${accountName}, Account Number: ${accountNumber}`,
    }

    await transporter.sendMail(mailOptions)
    console.log('Email sent successfully')
  } catch (error) {
    console.error('Error sending email:', error)
  }
}
const releasePaymentTaskerEmail = async ({
  accountName,
  accountNumber,
  taskTitle,
  taskerEmail,
}) => {
  try {
    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: taskerEmail,
      subject: 'Payment Released',
      text: `Payment has been released by the student for ${taskTitle}, it will take 2-5 business days to reflect in your nominated bank account. Account Holder Name: ${accountName}, Account Number: ${accountNumber}`,
    }

    await transporter.sendMail(mailOptions)
    console.log('Email sent successfully')
  } catch (error) {
    console.error('Error sending email:', error)
  }
}
module.exports = {
  sendEmailToAirtaska,
  newOfferEmail,
  acceptOfferEmail,
  withdrawFromTaskEmail,
  withdrawOfferEmail,
  updateOfferEmail,
  releasePaymentAdminEmail,
  releasePaymentTaskerEmail,
  requestPaymentEmail,
  cancelTaskEmail,
}
