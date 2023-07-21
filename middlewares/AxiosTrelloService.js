const axios = require('axios')
const ConstantMesssages = require("../utils/ConstantMesssages.js")
const { SuccessDataResult, ErrorResult } = require('../utils/Result.js')

const BASE_URL = process.env.BASE_URL
const API_KEY = process.env.TRELLO_API_KEY
const TOKEN = process.env.TRELLO_TOKEN

class TrelloService {

    static #TAG = "TrelloService"

    // Board
    createBoard = async(name, description, closed, pinned) => {
        try {
            const response = await axios.post(
                `${BASE_URL}boards/?name=${name}&desc=${description}&closed=${closed}&pinned=${pinned}&key=${API_KEY}&token=${TOKEN}`
            )
            return new SuccessDataResult(response.data, ConstantMesssages.axiosSuccessMessage)
        } catch (error) {
            console.log(`${TrelloService.#TAG}, ${error}`)
            return new ErrorResult(ConstantMesssages.axiosError)
        }
    }

    updateBoard = async(idBoard, name, description, closed, pinned) => {
        try {
            const response = await axios.put(
                `${BASE_URL}boards/${idBoard}?key=${API_KEY}&token=${TOKEN}&name=${name}&desc=${description}&closed=${closed}&pinned=${pinned}`
            )
            return new SuccessDataResult(response.data, ConstantMesssages.axiosSuccessMessage)
        } catch (error) {
            console.log(`${TrelloService.#TAG}, ${error}`)
            return new ErrorResult(ConstantMesssages.axiosError)
        }
    }

    deleteBoard = async idBoard => {
        try {
            const response = await axios.delete(
                `${BASE_URL}boards/${idBoard}?key=${API_KEY}&token=${TOKEN}`
            )
            return new SuccessDataResult(response.data, ConstantMesssages.axiosSuccessMessage)
        } catch (error) {
            console.log(`${TrelloService.#TAG}, ${error}`)
            return new ErrorResult(ConstantMesssages.axiosError)
        }
    }

    // List
    createList = async(idBoard, name, closed) => {
        try {
            const response = await axios.post(
                `${BASE_URL}lists?name=${name}&idBoard=${idBoard}&closed=${closed}&key=${API_KEY}&token=${TOKEN}`
            )
            return new SuccessDataResult(response.data, ConstantMesssages.axiosSuccessMessage)
        } catch (error) {
            console.log(`${TrelloService.#TAG}, ${error}`)
            return new ErrorResult(ConstantMesssages.axiosError)
        }
    }

    updateList = async(idList, idBoard, name, closed) => {
        try {
            const response = await axios.put(
                `${BASE_URL}lists/${idList}?key=${API_KEY}&token=${TOKEN}&idBoard=${idBoard}&name=${name}&closed=${closed}`
            )
            return new SuccessDataResult(response.data, ConstantMesssages.axiosSuccessMessage)
        } catch (error) {
            console.log(`${TrelloService.#TAG}, ${error}`)
            return new ErrorResult(ConstantMesssages.axiosError)
        }
    }

    // CARD
    createCard = async(idList, name, description) => {
        try {
            const response = await axios.post(
                `${BASE_URL}cards?key=${API_KEY}&token=${TOKEN}&idList=${idList}&name=${name}&desc=${description}`
            )
            return new SuccessDataResult(response.data, ConstantMesssages.axiosSuccessMessage)
        } catch (error) {
            console.log(`${TrelloService.#TAG}, ${error}`)
            return new ErrorResult(ConstantMesssages.axiosError)
        }
    }

    updateCard = async(idCard, name, description) => {
        try {
            const response = await axios.put(
                `${BASE_URL}cards/${idCard}?key=${API_KEY}&token=${TOKEN}&name=${name}&desc=${description}`
            )
            return new SuccessDataResult(response.data, ConstantMesssages.axiosSuccessMessage)
        } catch (error) {
            console.log(`${TrelloService.#TAG}, ${error}`)
            return new ErrorResult(ConstantMesssages.axiosError)
        }
    }

    deleteCard = async idCard => {
        try {
            const response = await axios.delete(
                `${BASE_URL}cards/${idCard}?key=${API_KEY}&token=${TOKEN}`
            )
            return new SuccessDataResult(response.data, ConstantMesssages.axiosSuccessMessage)
        } catch (error) {
            console.log(`${TrelloService.#TAG}, ${error}`)
            return new ErrorResult(ConstantMesssages.axiosError)
        }
    }

    // Attachment
    createAttachment = async(cardId, imageUrl) => {
        try {
            const response = await axios.post(
                `${BASE_URL}cards/${cardId}/attachments?token=${TOKEN}&url=${imageUrl}&key=${API_KEY}`
            )
            return new SuccessDataResult(response.data, ConstantMesssages.axiosSuccessMessage)
        } catch (error) {
            console.log(`${TrelloService.#TAG}, ${error}`)
            return new ErrorResult(ConstantMesssages.axiosError)
        }
    }

    deleteAttachemnt = async(cardId, attachmentId) => {
        try {
            const response = await axios.delete(
                `${BASE_URL}cards/${cardId}/attachments/${attachmentId}?key=${API_KEY}&token=${TOKEN}`
            )
            return new SuccessDataResult(response.data, ConstantMesssages.axiosSuccessMessage)
        } catch (error) {
            console.log(`${TrelloService.#TAG}, ${error}`)
            return new ErrorResult(ConstantMesssages.axiosError)
        }
    }
}

module.exports = new TrelloService