import { Request, Response } from "express";
import User from "../models/User";

export const getUsers = async (req: Request, res: Response) => {
	const users = await User.findAll()

	res.status(200).json({ users })
}

export const getUser = async (req: Request, res: Response) => {
	const { id } = req.params

	const user = await User.findByPk(id)

	if(!user)
		return res.status(404).json({ msg: `User with ID: ${ id } doesn't exist.` })

	res.status(200).json({ user })
}

export const saveUser = async (req: Request, res: Response) => {
	const { body } = req

	try {
		const verifyEmail = await User.findOne({ 
			where: { email: body.email }
		})

		if(verifyEmail)
			return res.status(400).json({ msg: `Email '${body.email}' already exists in db.` })

		const user = User.build(body)
		user.save()

		res.status(200).json({ user })
	} catch (error) {
		console.error(error)

		res.status(500).json({ msg: 'Reach out with administrator' })
	}
}

export const updateUser = async (req: Request, res: Response) => {
	const { id } = req.params
	const { body } = req	

	try {
		const user = await User.findByPk(id);

		if(!user)
			return res.status(404).json({ msg: `User with ID : ${id} not found` })

		await user.update(body)

		res.status(200).json({ user })
	} catch (error) {
		console.error(error)

		res.status(500).json({ msg: 'Reach out with administrator' })
	}
}

export const deleteUser = async (req: Request, res: Response) => {
	const { id } = req.params
	const { body } = req
	
	try {
		const user = await User.findByPk(id);

		if(!user)
			return res.status(404).json({ msg: `User with ID : ${id} not found` })

		await user.update({isActive: false})

		// await user.destroy()

		res.status(200).json({ user })
	} catch (error) {
		console.error(error)

		res.status(500).json({ msg: 'Reach out with administrator' })
	}
}