const User = require('../Models/users');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // search for the user in the database and if exists then
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        user = await User.create({
            name: name,
            email: email,
            password: password,
            avatar: {
                public_id: "sample_id",
                url: "sample url"
            }
        });

        res.status(201).json({
            success: true,
            message: user,
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        res.status(200).json({
            success: true,
            user: user.name
        })
    }
    catch (error) {
        res.status(400).json(
            {
                success: false,
                message: error
            }
        )
    }
}

exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;

        // check using email if the user exists
        const user = await User.findOne({ email }).select("+password");

        // if the user is not in the db 
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exists!"
            })
        }

        // now is the user exists then check if the password matches
        const isMatch = await user.matchPassword(password);


        // if the password does not matches 
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password"
            })
        }

        // if the password matches

        // now generate a token for the user which will be stored on the cookies

        const tok = await user.generateToken();
        res.status(200).cookie("token", tok, { expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), httpOnly: true, }).json({
            success: true,
            user,
            tok,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        })

    }
}

exports.logout = async (req, res) => {
    try {
        res.status(200).cookie("token", null, { expires: new Date(Date.now()), httpOnly: true }).json({
            success: true,
            message: "Logged out",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


exports.updatePassword = async (req, res) => {
    try {

        const user = await User.findById(req.user._id).select("+password");
        const { oldPassword, newPassword } = req.body;

        const isMatch = await user.matchPassword(oldPassword);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                msg: "Incorrect password",
            });
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({
            success: true,
            msg: "password changed",
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}

