

// Controller function to send verification email
export const sendVerificationEmail = async (req, res) => {
    const { email } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Create a verification token with user's ID embedded
        const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '1d' });

        // Send verification email to the user
        const transporter = nodemailer.createTransport({
            // Configure your email provider details
        });

        const mailOptions = {
            from: 'your-email@example.com',
            to: email,
            subject: 'Email Verification',
            html: `
        <p>Please click the following link to verify your email:</p>
        <a href="http://example.com/verify/${token}">Verify Email</a>
      `
        };

        await transporter.sendMail(mailOptions);

        // Return success response
        res.status(200).json({ message: 'Verification email sent successfully' });

    } catch (error) {
        console.error('Error sending verification email:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function to verify user's email address
export const verifyEmail = async (req, res) => {
    const { token } = req.params;

    try {
        // Verify the token and extract user ID
        const decodedToken = jwt.verify(token, 'secret');
        const userId = decodedToken.userId;

        // Find the user by user ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Set the verified field to true
        user.verified = true;
        await user.save();

        // Return success response
        res.status(200).json({ message: 'Email verified successfully' });

    } catch (error) {
        console.error('Error verifying email:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
