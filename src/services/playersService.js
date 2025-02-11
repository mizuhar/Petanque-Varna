import * as request from '../lib/request'


const baseUrl = 'http://localhost:3030/data/players'

export const getAll = async () => {

   return  await request.get(baseUrl)
}
export const getOne = async (playerId) => {

   return  await request.get(`${baseUrl}/${playerId}`)
}
export const create = async (palayerData) => {

     return await request.post(baseUrl, palayerData)
}
export const update= async (playerId,palayerData) => {

     return await request.put(`${baseUrl}/${playerId}`, palayerData)
}

export const remove = async (playerId) =>{

    return await request.remove(`${baseUrl}/${playerId}`)
}