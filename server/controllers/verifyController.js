const verifyToken = ('/api/user/verify', (req,res) => {
    const data = req.body
    if(data.type === 'google'){
      console.log('hello google')
    }else{
      console.log('something else')
    }
  
    res.status(200).json({status: true, msg: 'hello user verification is done'})
  })

  module.exports = verifyToken