import axios from 'axios';

export default {

  getCommentsForPost(id){
    return axios.get(`/comments/${id}`);
  },
  getSpecificComment(id){
    return axios.get(`/comments/single/${id}`);
  },
  getAllUserComments(){
   return axios.get('/comments/user');
  },
  createComment(comment){
    return axios.post('/comments',comment);
  },
  updateComment(id,comment){
    return axios.put(`/comments/${id}`,comment);
  },
  deleteComment(id){
    return axios.delete(`/comments/${id}`);
  },
  getAllComments(){
    return axios.get('/comments')
  }

}