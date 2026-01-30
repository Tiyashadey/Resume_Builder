fetch('https://dummyjson.com/users')
    .then(res=>res.json())
    .then(data=>{
        const product = data.users.map(i => `${i.firstName} ${i.lastName}`)
        console.log(product)
    })
    .catch(e => {
        console.error(e)
    })