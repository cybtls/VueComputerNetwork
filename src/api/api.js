import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
let base = 'http://localhost:8080'
axios.defaults.withCredentials=true;



export const student = {
    stulogin(params){ return axios.post(`${base}/student/stulogin`,params).then(res=>{return res})},
    getmyscore(params){ return axios.post(`${base}/student/getmyscore`,params).then(res=>{return res})},
    getmyscorebyname(params){ return axios.post(`${base}/student/getmyscorebyname`,params).then(res=>{return res})},
    updatemyinfo(params){ return axios.post(`${base}/student/updatemyinfo`,params).then(res=>{return res})},
}

export const teacher = {
    teacherlogin(params){ return axios.post(`${base}/teacher/teacherlogin`,params).then(res=>{return res})},
    updatemyinfo(params){ return axios.post(`${base}/teacher/updatemyinfo`,params).then(res=>{return res})},
}

export const admin = {
}

