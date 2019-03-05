import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
let base = 'http://localhost:8080'
axios.defaults.withCredentials = true;



export const student = {
  stulogin(params) {
    return axios.get(`${base}/student/stulogin`, {"params":params}).then(res => {
      return res
    })
  },
  getmyscore(params) {
    return axios.post(`${base}/student/getmyscore`, params).then(res => {
      return res
    })
  },
  getmyscorebyname(params) {
    return axios.post(`${base}/student/getmyscorebyname`, params).then(res => {
      return res
    })
  },
  updatemyinfo(params) {
    return axios.post(`${base}/student/updatemyinfo`, params).then(res => {
      return res
    })
  },
}



export const teacher = {
  teacherlogin(params) {
    return axios.get(`${base}/teacher/teacherlogin`, {"params":params}).then(res => {
      return res
    })
  },
  updatemyinfo(params) {
    return axios.post(`${base}/teacher/updatemyinfo`, params).then(res => {
      return res
    })
  },
  // 获取自己所管理的班级
  getmyclassinfo(params) {
    return axios.post(`${base}/teacher/getmyclassinfo`, params).then(res => {
      return res
    })
  },
  //通过班级id来查询班级信息
  getmyclassbyid(params) {
    return axios.post(`${base}/teacher/getmyclassbyid`, params).then(res => {
      return res
    })
  },
  // 通过班级名来查询班级信息
  getmyclassbyname(params) {
    return axios.post(`${base}/teacher/getmyclassbyname`, params).then(res => {
      return res
    })
  },
  // 通过班级名来查询班级信息
  chagestatus(params) {
    return axios.post(`${base}/teacher/chagestatus`, params).then(res => {
      return res
    })
  },
  // 删除学生
  delstudent(params) {
    return axios.post(`${base}/teacher/delstudent`, params).then(res => {
      return res
    })
  },
}

export const admin = {
  adminlogin(params) {
    return axios.get(`${base}/admin/adminlogin`, {params:params}).then(res => {
      return res
    })
  },
  updatemyinfo(params) {
    return axios.post(`${base}/admin/updatemyinfo`, params).then(res => {
      return res
    })
  }
}
