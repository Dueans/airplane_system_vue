// 用来放api接口的文件

import { get } from './http_service.js'
import { post } from './http_service.js'
const apiAddress = 'localhost'
const apiPort = 8088
export const getStudentList = p => get(`http://${ apiAddress }:${ apiPort }/api/studentList`, p)

