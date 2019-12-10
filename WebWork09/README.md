### SignUP
#### Get Signed up!
 - 如果没有Node配件，可以使用cmd命令行安装
 >brew install node

 - 也可以在官网下载：https://nodejs.org/en/download/   
 - 在cmd输入node signin.js后在浏览器输入http://localhost:8000打开  
 - 已有2个已注册用户：  

> 1. "username":"suyy2000","studentId":"18342107","phone":"18888888888","email":"herosyyp@163.com","submit":""
> 2. "username":"herosyyp","studentId":"18342777","phone":"15678907890","email":"suyy26@sysu.com","submit":"" 


#### Find a User using username.
- 输入http://localhost:8000?username=abc 时，如果abc是已注册用户，显示“详情”，否则回到注册页面
- 其它情况均显示“注册”界面
- “注册”界面点击“重置”，清空表单所有内容
- “注册”界面点击“提交”，成功则跳转到对应用户的“详情”界面，不成功则回到注册界面，并高亮错误原因
- 用户信息储存在info.JSON中

#### 界面
- 界面如图  
  [1]: show.png "show.png"