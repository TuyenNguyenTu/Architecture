import axios from 'axios';

const client = axios.create({
    baseURL: 'https://localhost:44394/api/category',
    json: true
})
export default {
    async execute(method, resource, data) {
        return client({
            method,
            url: resource,
            data,
        }).then(req => {
            return req.data
        })
    },
    getAll() {
        return this.execute('get', '/');
    },
    create(data) {
        return this.execute('post', '/', data);
    },
    update(data) {
        try {
            return this.execute('put', '/', data)
        } catch (error) {
            console.log(error)
        }
    },
    delete(id) {
        return this.execute('delete', `${id}`)
    },
    getById(id) {
        return this.execute('get', `${id}`)
    },
    getListParent() {
        return this.execute('get', '/list-parent')
    },
    getChildrenCategory(id) {
        return this.execute('get', `/children/${id}`)
    }
}