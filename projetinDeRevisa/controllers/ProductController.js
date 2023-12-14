const conn = require("../db/conn")

module.exports = class ProductController{
    static getAllProduct(request, response){
        try {
            const sql = `SELECT * FROM tb_lista`;
            conn.query(sql, (err, data)=>{
                if(err){
                    console.log(err)
                }
                const products = data
                console.log(products)
                return response.render("product/home", { products });
            })
        } catch (error) {
            console.error(error)
            response.status(500).json("Erro no servidor.")
        }   
    }

    static createProduct(request, response){
        try {
            if(!request.body.nome || !request.body.quantidade){
                return response.status(400).json({
                    message: "Por favor, preencha todos os campos!",
                })
            }

            const {nome, quantidade} = request.body

            //DML -> Manipulação
            const sql = `INSERT INTO tb_lista (nome, quantidade) VALUES ("${nome}", "${quantidade}")`

            conn.query(sql, (err) =>{
                if(err){
                    console.log(err)
                }
                return response.rendirect("/product")
            })

        } catch (error) {
            console.error(error)
            response.status(500).json("Erro no servidor.")
        }
    }
    static getProduct(request, response){
        try {
            const {id} = request.params

            const sql = `SELECT * FROM tb_lista WHERE id= ${id}`

            conn.query(sql, (err, data)=>{
                if(err){
                    console.log(err)
                }
                const product = data

                return response.render("product/home")
            })
        } catch (error) {
            console.error(error)
            response.status(500).json("Erro no servidor.")
        }
    }
    static updateProduct(request, response){
        
    }
    static removeProduct(request, response){
        try {
            const {id} = request.body

            const sql = `DELETE FROM tb_lista WHERE id = ${id}`

            conn.query(sql, (err)=>{
                if(err){
                    console.log(err)
                }
            })

            return response.redirect("/product")

        } catch (error) {
            console.error(error)
            response.status(500).json("Erro no servidor.")
        }
    }
}
