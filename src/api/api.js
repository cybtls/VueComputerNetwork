import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
let base = 'http://localhost:8080'
axios.defaults.withCredentials = true;



export const student = {
  //登录验证
  stulogin(params) {
    return axios.get(`${base}/student/stulogin`, {
      params: params
    }).then(res => {
      return res
    })
  },
  //获取所有成绩
  getmyscore(params) {
    return axios.post(`${base}/student/getmyscore`, params).then(res => {
      return res
    })
  },
  //根据课程名获取成功
  getmyscorebyname(params) {
    return axios.post(`${base}/student/getmyscorebyname`, params).then(res => {
      return res
    })
  },
  // 更新个人信息
  updatemyinfo(params) {
    return axios.post(`${base}/student/updatemyinfo`, params).then(res => {
      return res
    })
  },
  getteacherlist(params) {
    return axios.get(`${base}/student/getteacherlist`, params).then(res => {
      return res
    })
  },

}

export const teacher = {
  // 登录验证
  teacherlogin(params) {
    return axios.get(`${base}/teacher/teacherlogin`, {
      params: params
    }).then(res => {
      return res
    })
  },
  // 更新个人数据
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
  // 登录验证
  adminlogin(params) {
    return axios.get(`${base}/admin/adminlogin`, {
      params: params
    }).then(res => {
      return res
    })
  },
  // 更新个人信息
  updatemyinfo(params) {
    return axios.post(`${base}/admin/updatemyinfo`, params).then(res => {
      return res
    })
  },
  // 获取所有班级
  getallclass(params) {
    return axios.get(`${base}/admin/getallclass`, {
      params: params
    }).then(res => {
      return res
    })
  },
  // 获取班级列表
  getclasslist(params) {
    return axios.post(`${base}/admin/getclasslist`, params).then(res => {
      return res
    })
  },
  // 更新班级信息
  updateclassname(params) {
    return axios.get(`${base}/admin/updateclassname`, {
      params: params
    }).then(res => {
      return res
    })
  },
  //删除班级
  delclass(params) {
    return axios.get(`${base}/admin/delclass`, {
      params: params
    }).then(res => {
      return res
    })
  },
  //添加班级
  addclass(params) {
    return axios.get(`${base}/admin/addclass`, {
      params: params
    }).then(res => {
      return res
    })
  },
  //获取所有学生
  getallstudent(params) {
    return axios.get(`${base}/admin/getallstudent`, {
      params: params
    }).then(res => {
      return res
    })
  },
  //按班级名获取学生信息
  getstudentbyclassname(params) {
    return axios.get(`${base}/admin/getstudentbyclassname`, {
      params: params
    }).then(res => {
      return res
    })
  },
  //按学生姓名获取学生信息
  getstudentbystudentname(params) {
    return axios.get(`${base}/admin/getstudentbystudentname`, {
      params: params
    }).then(res => {
      return res
    })
  },
  // delstudent(params) {
  //   return axios.get(`${base}/admin/delstudent`,{params:params}).then(res => {
  //     return res
  //   })
  // },
  //改变学生状态
  chagestatus(params) {
    return axios.post(`${base}/admin/chagestatus`, params).then(res => {
      return res
    })
  },
  // 添加学生
  addstudent(params) {
    return axios.post(`${base}/admin/addstudent`, params).then(res => {
      return res
    })
  },
  //编辑学生信息
  editstudent(params) {
    return axios.post(`${base}/admin/editstudent`, params).then(res => {
      return res
    })
  },
  //获取所有老师信息
  getteacher(params) {
    return axios.post(`${base}/admin/getteacher`, params).then(res => {
      return res
    })
  },
  //改变老师状态
  changeteacherstatus(params) {
    return axios.post(`${base}/admin/changeteacherstatus`, params).then(res => {
      return res
    })
  },
  //编辑老师信息
  editteacher(params) {
    return axios.post(`${base}/admin/editteacher`, params).then(res => {
      return res
    })
  },
  //添加老师
  addteacher(params) {
    return axios.post(`${base}/admin/addteacher`, params).then(res => {
      return res
    })
  },
  //获取老师班级关系表
  getttc(params) {
    return axios.get(`${base}/admin/getttc`, {
      params: params
    }).then(res => {
      return res
    })
  },
  // 获取老师列表
  getteacherlist(params) {
    return axios.get(`${base}/admin/getteacherlist`, {
      params: params
    }).then(res => {
      return res
    })
  },
  // 添加新的老师班级关系
  addttc(params) {
    return axios.post(`${base}/admin/addttc`, params).then(res => {
      return res
    })
  },
  //删除老师班级关系
  delttc(params) {
    return axios.get(`${base}/admin/delttc`, {
      params: params
    }).then(res => {
      return res
    })
  },
}

export const resources = {
  //上传资源在具体页面实现
  //获取资源
  getresources(params) {
    return axios.post(`${base}/resources/getresources`, params).then(res => {
      return res
    })
  },
  // 删除资源
  delresources(params) {
    return axios.get(`${base}/resources/delresources`, {
      params: params
    }).then(res => {
      return res
    })
  },
  // 下载资源
  downresources(params) {
    return axios.post(`${base}/resources/downresources`, params, {
      responseType: 'blob'
    }).then(res => {
      return res
    })
  },
  getresourcesbyname(params) {
    return axios.get(`${base}/resources/getresourcesbyname`, {
      params: params
    }).then(res => {
      return res
    })
  },

}

export const video = {
  getvideo(params) {
    return axios.post(`${base}/video/getvideo`, params).then(res => {
      return res
    })
  },
  getvideobyname(params) {
    return axios.get(`${base}/video/getvideobyname`, {
      params: params
    }).then(res => {
      return res
    })
  },
  delvideo(params) {
    return axios.get(`${base}/video/delvideo`, {
      params: params
    }).then(res => {
      return res
    })
  },
  addviewingtimes(params) {
    return axios.get(`${base}/video/addviewingtimes`, {
      params: params
    }).then(res => {
      return res
    })
  }
}

export const category = {
  // 获取所有类别
  getallcategory(params) {
    return axios.get(`${base}/category/getallcategory`, {
      params: params
    }).then(res => {
      return res
    })
  },
  //添加类别
  addcategory(params) {
    return axios.get(`${base}/category/addcategory`, {
      params: params
    }).then(res => {
      return res
    })
  },
  // 删除类别
  delcategory(params) {
    return axios.get(`${base}/category/delcategory`, {
      params: params
    }).then(res => {
      return res
    })
  },
}

export const problems = {
  getmyproblems(params) {
    return axios.get(`${base}/problems/getmyproblems`, {
      params: params
    }).then(res => {
      return res
    })
  },
  getteachernamebyid(params) {
    return axios.get(`${base}/problems/getteachernamebyid`, {
      params: params
    }).then(res => {
      return res
    })
  },
  delproblem(params) {
    return axios.get(`${base}/problems/delproblem`, {
      params: params
    }).then(res => {
      return res
    })
  },
  addproblem(params) {
    return axios.post(`${base}/problems/addproblem`, params).then(res => {
      return res
    })
  },
  getmyproblemsbyteacherid(params) {
    return axios.get(`${base}/problems/getmyproblemsbyteacherid`, {
      params: params
    }).then(res => {
      return res
    })
  },
}

export const answer = {
  addanswer(params) {
    return axios.post(`${base}/answer/addanswer`, params).then(res => {
      return res
    })
  },
}

export const score = {
  getstuscore(params) {
    return axios.get(`${base}/score/getstuscore`, {
      params: params
    }).then(res => {
      return res
    })
  },
  addscore(params) {
    return axios.post(`${base}/score/addscore`, params).then(res => {
      return res
    })
  },
}

export const course = {
  getcourse(params) {
    return axios.get(`${base}/course/getcourse`, {
      params: params
    }).then(res => {
      return res
    })
  },
}

export const post = {
  getpost(params) {
    return axios.get(`${base}/post/getpost`, {
      params: params
    }).then(res => {
      return res
    })
  },
  getmypost(params) {
    return axios.get(`${base}/post/getmypost`, {params:params}).then(res => {
      return res
    })
  },
  addpostfire(params) {
    return axios.get(`${base}/post/addpostfire`, {
      params: params
    }).then(res => {
      return res
    })
  },
  addpost(params) {
    return axios.post(`${base}/post/addpost`, params).then(res => {
      return res
    })
  },
  delpost(params) {
    return axios.get(`${base}/post/delpost`, {params:params}).then(res => {
      return res
    })
  }
}


export const comment = {
  getcomment(params) {
    return axios.get(`${base}/comment/getcomment`, {
      params: params
    }).then(res => {
      return res
    })
  },
  addcomment(params) {
    return axios.post(`${base}/comment/addcomment`, params).then(res => {
      return res
    })
  },
  delcomment(params) {
    return axios.post(`${base}/comment/delcomment`, params).then(res => {
      return res
    })
  },
}
