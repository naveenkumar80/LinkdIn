import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import  genToken from "../config/token.js";
export const signUp = async (req, res) => {
    try {
        let { firstName, lastName, email, password, userName } = req.body;
        let existEmail = await User.findOne({ email });
        if (existEmail) {
            return res.status(400).json({ message: "Email already exists !" });
        }
        let existUserName= await User.findOne({ userName });
        if (existUserName) {
            return res.status(400).json({ message: "Username already exists !" });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long !" });
        }

        let hassedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            userName,
            firstName,
            lastName,
            email,
            password: hassedPassword,
        })

        let token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite : "strict",
            secure : process.env.node_env === "production" ? false : true,
        })
        return res.status(201).json({ message: "User created successfully", User });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
        
    }
}

export const logIn = async (req, res) => {
    try {
        let {email, password } = req.body;
        let existEmail = await User.findOne({ email });
        if (!existEmail) {
            return res.status(400).json({ message: "Email doesn't exists !" });
        }
        let isPassword = await bcrypt.compare(password, existEmail.password);
        if (!isPassword) {
            return res.status(400).json({ message: "Invalid credentials !" });
        }
        
        let token = await genToken(existEmail._id);
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite : "strict",
            secure : process.env.node_env === "production" ? false : true,
        })
        return res.status(200).json({ message: "User Login successfully", existEmail });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const logOut = async (req, res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        return res.status(500).json({ message: "Logout error" });
    }
}