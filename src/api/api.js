import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
let base = 'http://localhost:8080'
axios.defaults.withCredentials = true;



export const student = {
  stulogin(params) {
    return axios.get(`${base}/student/stulogin`, {params:params}).then(res => {
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
    return axios.get(`${base}/teacher/teacherlogin`, {params:params}).then(res => {
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
  // 改变学生状态
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
  },
  getallclass(params) {
    return axios.get(`${base}/admin/getallclass`,{params:params}).then(res => {
      return res
    })
  },
  getclasslist(params) {
    return axios.post(`${base}/admin/getclasslist`,params).then(res => {
      return res
    })
  },
  updateclassname(params) {
    return axios.get(`${base}/admin/updateclassname`,{params:params}).then(res => {
      return res
    })
  },
  delclass(params) {
    return axios.get(`${base}/admin/delclass`,{params:params}).then(res => {
      return res
    })
  },
  addclass(params) {
    return axios.get(`${base}/admin/addclass`,{params:params}).then(res => {
      return res
    })
  },
  getallstudent(params) {
    return axios.get(`${base}/admin/getallstudent`,{params:params}).then(res => {
      return res
    })
  },
  getstudentbyclassname(params) {
    return axios.get(`${base}/admin/getstudentbyclassname`,{params:params}).then(res => {
      return res
    })
  },
  getstudentbystudentname(params) {
    return axios.get(`${base}/admin/getstudentbystudentname`,{params:params}).then(res => {
      return res
    })
  },
  // delstudent(params) {
  //   return axios.get(`${base}/admin/delstudent`,{params:params}).then(res => {
  //     return res
  //   })
  // },
  chagestatus(params) {
    return axios.post(`${base}/admin/chagestatus`, params).then(res => {
      return res
    })
  },
  addstudent(params) {
    return axios.post(`${base}/admin/addstudent`, params).then(res => {
      return res
    })
  },
  editstudent(params) {
    return axios.post(`${base}/admin/editstudent`, params).then(res => {
      return res
    })
  },
  getteacher(params) {
    return axios.post(`${base}/admin/getteacher`, params).then(res => {
      return res
    })
  },
  changeteacherstatus(params) {
    return axios.post(`${base}/admin/changeteacherstatus`, params).then(res => {
      return res
    })
  },
  editteacher(params) {
    return axios.post(`${base}/admin/editteacher`, params).then(res => {
      return res
    })
  },
  addteacher(params) {
    return axios.post(`${base}/admin/addteacher`, params).then(res => {
      return res
    })
  },
  getttc(params) {
    return axios.get(`${base}/admin/getttc`, {params:params}).then(res => {
      return res
    })
  },
  getteacherlist(params) {
    return axios.get(`${base}/admin/getteacherlist`, {params:params}).then(res => {
      return res
    })
  },
  addttc(params) {
    return axios.post(`${base}/admin/addttc`, params).then(res => {
      return res
    })
  },
  delttc(params) {
    return axios.get(`${base}/admin/delttc`, {params:params}).then(res => {
      return res
    })
  },
}


export const resources = {
  getresources(params) {
    return axios.post(`${base}/resources/getresources`, params).then(res => {
      return res
    })
  },
  delresources(params) {
    return axios.get(`${base}/resources/delresources`, {params:params}).then(res => {
      return res
    })
  },
  downresources(params) {
    return axios.post(`${base}/resources/downresources`, params,{responseType: 'blob'}).then(res => {
      return res
    })
  },
}

export const category = {
  getallcategory(params) {
    return axios.get(`${base}/category/getallcategory`, {params:params}).then(res => {
      return res
    })
  },
  addcategory(params) {
    return axios.get(`${base}/category/addcategory`,  {params:params}).then(res => {
      return res
    })
  },
  delcategory(params) {
    return axios.get(`${base}/category/delcategory`, {params:params}).then(res => {
      return res
    })
  },
}
