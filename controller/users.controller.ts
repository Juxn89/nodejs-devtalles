import { Request, Response } from "express";

export const getUsers = (req: Request, res: Response) => {
	res.status(200).json({ msg: 'List of users :)' })
}

export const getUser = (req: Request, res: Response) => {
	const { id } = req.params
	res.status(200).json({ msg: 'Users', id })
}

export const saveUser = (req: Request, res: Response) => {
	const { body } = req
	res.status(200).json({ msg: 'Post User', body })
}

export const updateUser = (req: Request, res: Response) => {
	const { id } = req.params
	const { body } = req
	res.status(200).json({ msg: 'Update User', body })
}

export const deleteUser = (req: Request, res: Response) => {
	const { id } = req.params
	const { body } = req
	res.status(200).json({ msg: 'Delete User', body })
}