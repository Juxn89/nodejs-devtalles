const { Router } = require('express')
const { getUser, postUser, putUser, deleteUser, patchUser } = require('../controllers/user.controller')

const router = Router()

router.get('/', getUser)

router.post('/', postUser)

router.put('/', putUser)

router.patch('/', patchUser)

router.delete('/', deleteUser)

module.exports = router;