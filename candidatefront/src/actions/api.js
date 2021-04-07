import axios from 'axios';

const url = 'https://localhost:44359/api/Candidate/';

export default {

    Candidate() {
        return {
            read: () => axios.get(url),
            readById: id => axios.get(url + id),
            create: candidate => axios.post(url, candidate),
            update: (id, newCandidate) => axios.put(url + id, newCandidate),
            delete: id => axios.delete(url + id)
        }
    }
}