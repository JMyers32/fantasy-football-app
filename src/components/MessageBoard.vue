<template>
    <v-container > 
      <v-row style="margin-left:13vw;" class="fill-height">
        <v-col cols="12" sm="6" md="4">
      <v-btn  @click="showLeaderOverlay=true" width="20vw" height="7vh" class="airBtn" style="margin-left:-10vw;" rounded>Leader Board</v-btn>
      </v-col>
        <v-col cols="12" sm="6" md="4">
      <v-btn  @click="showPostOverlay=true" width="20vw" height="7vh" class="airBtn" rounded>Air A Grievance</v-btn>
      </v-col>
    </v-row>
    <v-overlay v-if="showLeaderOverlay" :value="true" outlined style="margin-top:-50vh">
      <v-card>
      <v-btn icon @click="showLeaderOverlay=false"><v-icon>mdi-close</v-icon></v-btn> 
    <leader-board/>
  </v-card>
    </v-overlay>
    <!-- create post overlay -->
      <v-overlay v-if="showPostOverlay" :value="true">
        <v-card style="width:50vw;" outlined>
          <v-btn icon @click="closePostOverlay"><v-icon>mdi-close</v-icon></v-btn> 
        <v-tabs background-color="#1E1E1E">
        <v-tab @click="activeTab = activeTab === 1 ? null : 1" background-color="#1E1E1E">
        <v-icon>mdi-video</v-icon>
         </v-tab>
         <v-tab @click="activeTab = activeTab === 2 ? null : 2" background-color="#1E1E1E">
         <v-icon>mdi-image</v-icon>
         </v-tab>
         <v-tab-item v-show="activeTab === 1" background-color="#1E1E1E" :transition="false">
         <v-text-field v-model="newPost.videoUrl" label="Youtube Url" auto-grow row="5" class="postArea" style="background-color: #1E1E1E;"></v-text-field>
         </v-tab-item>
        <v-tab-item v-show="activeTab === 2" background-color="#1E1E1E" :transition="false">
        <v-text-field v-model="newPost.siteLink" label="Gif Url" auto-grow row="5" class="postArea" style="background-color: #1E1E1E;"></v-text-field>
        </v-tab-item>
       </v-tabs>
      <v-card-actions class="text-center" dark>
        <v-textarea v-model="newPost.post" label="Air Your Grievance" auto-grow row="5" class="postArea" outlined>  
        </v-textarea>  
    </v-card-actions>
    <v-btn  @click="addPost(newPost); showPostOverlay=false;">Complain</v-btn>
  </v-card>
    </v-overlay>
    <!--  --> 
    <!-- user posts -->
    <v-container>
      <v-card  v-for="post in displayPosts" :key="post.postId" dark outlined >
        <v-card-title id="posterName"><v-avatar>
          <v-img :src=displayPicture(post.userId)></v-img>&nbsp;
        </v-avatar>{{displayName(post.userId)}}</v-card-title>
        <v-card-text class="d-flex align-center">
    <div class="mr-3" v-if="post.videoUrl" style="padding-left:3vw;">
      <iframe style="border-radius: 1vw;" width="400" height="225" :src="getYoutubeEmbedUrl(post.videoUrl)" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    </div>
    <div class="mr-3" v-if="post.siteLink" style="padding-left:3vw;">
      <v-img :src="post.siteLink" style="border-radius: 1vw;" max-width="400" max-height="225"></v-img>
    </div>
    <div>
      <v-card-text style="font-size:larger" class="text-left" v-if="!post.editing" id="posterMessage">{{ post.post }}</v-card-text>
    </div>
  </v-card-text>
        <v-text-field v-if="post.editing && profile.userId==post.userId" v-model="post.videoUrl" label="Video Url" auto-grow row="5" class="postArea" style="background-color: #1E1E1E;"></v-text-field>
        <v-text-field v-if="post.editing && profile.userId==post.userId" v-model="post.siteLink" label="Gif Url" auto-grow row="5" class="postArea" style="background-color: #1E1E1E;"></v-text-field>
        <v-textarea style="font-size:larger" v-if="post.editing && profile.userId==post.userId" v-model="post.post" label="Air Your Grievance" auto-grow row="5" class="postArea" outlined></v-textarea>
        <v-btn icon v-if="profile.userId==post.userId && !post.editing" @click="post.editing = true"><v-icon>mdi-pencil</v-icon></v-btn>
        <v-btn icon v-if="profile.userId==post.userId && post.editing" @click="editPost(post); post.editing = false"><v-icon>mdi-content-save</v-icon></v-btn>
        <v-btn icon v-if="profile.userId==post.userId && post.editing" @click="post.editing = false"><v-icon>mdi-close</v-icon></v-btn>
        <v-btn icon v-if="profile.userId==post.userId" @click="deletePost(post.postId)"><v-icon>mdi-trash-can</v-icon></v-btn>
        <v-btn icon @click="showOverlay=true; selectedPost=post; getCommentsForPost(selectedPost.postId)" ><v-icon>mdi-comment</v-icon></v-btn>
        <v-btn icon @click="increasePostKarma(post)" v-if="profile.userId!=post.userId"><v-icon>mdi-thumb-up</v-icon></v-btn>
        &nbsp;{{post.karma}}&nbsp;
        <v-btn icon @click="decreasePostKarma(post)" v-if="profile.userId!=post.userId"><v-icon>mdi-thumb-down</v-icon></v-btn>
      <!--  -->
      <!-- comment overlay -->
      <v-overlay v-if="showOverlay" :value="true">
      <v-card  outlined style="width:50vw;max-height: 80vh; overflow-y: auto; ">
        <v-card>
        <v-btn icon @click="showOverlay=false"><v-icon>mdi-close</v-icon></v-btn>
        <v-card-title id="posterName"><v-avatar>
          <v-img :src=displayPicture(selectedPost.userId)></v-img>&nbsp;
        </v-avatar>{{displayName(selectedPost.userId)}}</v-card-title>
        <v-card-text class="d-flex align-center">
    <div class="mr-3" v-if="selectedPost.videoUrl" style="padding-left:3vw;">
      <iframe style="border-radius: 1vw;" width="400" height="225" :src="getYoutubeEmbedUrl(selectedPost.videoUrl)" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    </div>
    <div class="mr-3" v-if="selectedPost.siteLink" style="padding-left:3vw;">
      <v-img :src="selectedPost.siteLink" style="border-radius: 1vw;" max-width="400" max-height="225"></v-img>
    </div>
    <div>
      <v-card-text style="font-size:larger" class="text-left" v-if="!selectedPost.editing" id="posterMessage">{{ selectedPost.post }}</v-card-text>
    </div>
  </v-card-text>
      </v-card>
        <v-card-actions class="text-center" dark>
        <v-textarea v-model="newComment.response" label="Comment" auto-grow row="5" class="postArea" outlined>
        </v-textarea>
      </v-card-actions>
      <v-btn @click="addComment(newComment)" color="blue" style="margin-top:-4vh;margin-left:.5vw;">Comment</v-btn>
      <v-card v-for="comment in comments" :key="comment.commentId" outlined >
      <v-card-title id="posterName"><v-avatar>
          <v-img :src=displayPicture(comment.userId)></v-img>&nbsp;
        </v-avatar>{{displayName(comment.userId)}}</v-card-title>
        <v-card-text style="font-size:larger" class="text-center"  v-if="!comment.editing" id="posterMessage">{{ comment.response }}</v-card-text>
        <v-textarea style="font-size:larger;" v-if="comment.editing && profile.userId==comment.userId" v-model="comment.response" label="Comment" auto-grow row="5" class="postArea"></v-textarea>
        <v-btn icon v-if="profile.userId==comment.userId && !comment.editing" @click="comment.editing = true"><v-icon>mdi-pencil</v-icon></v-btn>
        <v-btn icon v-if="profile.userId==comment.userId && comment.editing" @click="editComment(comment.commentId,comment); comment.editing = false"><v-icon>mdi-content-save</v-icon></v-btn>
        <v-btn icon v-if="profile.userId==comment.userId && comment.editing" @click="comment.editing = false"><v-icon>mdi-close</v-icon></v-btn>
        <v-btn icon v-if="profile.userId==comment.userId" @click="deleteAComment(comment.commentId)"><v-icon>mdi-trash-can</v-icon></v-btn>
        <v-btn icon @click="increaseCommentKarma(comment.commentId,comment)" v-if="profile.userId!=comment.userId"><v-icon>mdi-thumb-up</v-icon></v-btn>
        &nbsp;{{comment.karma}} &nbsp;
        <v-btn icon @click="decreaseCommentKarma(comment.commentId,comment)" v-if="profile.userId!=comment.userId"><v-icon>mdi-thumb-down</v-icon></v-btn>
      </v-card>
      </v-card>
   
      </v-overlay>
      <!--  --> 
    </v-card>
  
    </v-container>
    </v-container>
</template>


<script>
import PostService from '@/services/PostService';
import CommentService from '@/services/CommentService';
import ProfileService from '@/services/ProfileService';
import LeaderBoard from './LeaderBoard.vue';

export default {
  components:{
    LeaderBoard
   

  },
name:'message-board',
data(){
  return{
    posts:[],
    comments:[],
    profile:{},
    newPost:{},
    newComment:{},
    allProfiles:[],
    showOverlay:false,
    showLeaderOverlay:false,
    selectedPost:null,
    showPostOverlay:false,
    allComments:[],
    filteredComments:[],
    activeTab:null,
    videoId: null,
    numPostToShow:5,
   
  }
  
},
created(){
  PostService.getAllPosts().then((response)=>{
  this.posts = response.data
    .map((post)=>{
      return {...post, editing:false};
    })
    .sort((post1, post2) => post2.postId - post1.postId); 
});
window.addEventListener('scroll',this.onScroll);

  ProfileService.getProfile().then((response)=>{
    this.profile=response.data;
  })
  ProfileService.getAllProfiles().then((response)=>{
    this.allProfiles=response.data;
  })
  CommentService.getAllComments().then((response)=>{
    this.allComments=response.data;
  })
  
},

 beforeDestroy(){
window.removeEventListener('scroll',this.onScroll);
},


computed:{
displayPosts(){
  return this.posts.slice(0,this.numPostToShow);
},

},

methods:{
  onScroll(){
  const scrollY=window.scrollY;
  const visibleHeight=window.innerHeight;
  const totalHeight=document.body.scrollHeight;
  const bottomOfPage=scrollY+visibleHeight>=totalHeight;
  if(bottomOfPage){
    this.numPostToShow+=5;
    
  }
},

 filterAllComments(postId){
  this.filteredComments=this.allComments.filter(comment => comment.postID === postId);
 }, 
 getCommentsForPost(postId) {
  CommentService.getCommentsForPost(postId).then((response) => {
    this.comments = response.data
      .map((comment) => {
        return { ...comment, editing: false };
      })
      .sort((comment1, comment2) => comment2.commentId - comment1.commentId);
  });
},
 addComment(comment){
   comment.postId=this.selectedPost.postId
   CommentService.createComment(comment).then((response)=>{
    if(response.status==200){
      this.getCommentsForPost(this.selectedPost.postId)
      this.selectedPost.comments.push(comment);
    }
   });
   this.newComment={};
 },
 addPost(post){
  PostService.createPost(post).then((response)=>{
    if(response.status==200){
      PostService.getAllPosts().then((response)=>{
  this.posts = response.data
    .map((post)=>{
      return {...post, editing:false};
    })
    .sort((post1, post2) => post2.postId - post1.postId); 
});
    this.newPost={};
    }
    
  })
 },
 displayName(userId){
    let displayName;
    for(let i=0;i<this.allProfiles.length;i++){
       if(userId==this.allProfiles[i].userId){
        displayName=this.allProfiles[i].displayName;
       }
    }
    return displayName;
  },
  displayPicture(userId){
    let picture;
    for(let i=0;i<this.allProfiles.length;i++){
      if(userId==this.allProfiles[i].userId){
        picture=this.allProfiles[i].profilePicture;
      }
    }
    return picture;
  },
  editPost(post){
  PostService.updatePost(post).then((response)=>{
    if(response.status==200){
      const index = this.posts.findIndex(p => p.postId === post.postId);
      this.posts.splice(index, 1, {...post, editing: false});
    }
  })
},
  deletePost(id){
    PostService.deletePost(id).then((response=>{
      if(response.status==200){
        PostService.getAllPosts().then((response)=>{
  this.posts = response.data
    .map((post)=>{
      return {...post, editing:false};
    })
    .sort((post1, post2) => post2.postId - post1.postId); 
});
      }
      
    }))
  },
  increasePostKarma(post) {
  post.karma += 1;
  PostService.updatePost(post).then((response) => {
    if (response.status == 200) {
      const index = this.posts.findIndex((p) => p.postId === post.postId);
      this.posts.splice(index, 1, post);
    } else {
     
      console.error('Failed to update post karma.');
    }
  });
  
},
decreasePostKarma(post) {
  post.karma -= 1;
  PostService.updatePost(post).then((response) => {
    if (response.status == 200) {
      const index = this.posts.findIndex((p) => p.postId === post.postId);
      this.posts.splice(index, 1, post);
    } else {
      console.error('Failed to update post karma.');
    }
  });
  
},
editComment(id,comment){
 CommentService.updateComment(id,comment).then((response)=>{
  if(response.status==200){
    const index = this.comments.findIndex(c => c.commentId === comment.commentId);
      this.comments.splice(index, 1, {...comment, editing: false});
  }
 })
},
deleteAComment(id){
 CommentService.deleteComment(id).then((response)=>{
  if(response.status==200){
    this.getCommentsForPost(this.selectedPost.postId)
  }
 })
},
increaseCommentKarma(id,comment) {
  comment.karma += 1;
  CommentService.updateComment(id,comment).then((response) => {
    if (response.status == 200) {
      const index = this.comments.findIndex((c) => c.commentId === comment.commentId);
      this.comments.splice(index, 1, comment);
    } else {
     
      console.error('Failed to update post karma.');
    }
  });
},
decreaseCommentKarma(id,comment) {
  comment.karma -= 1;
  CommentService.updateComment(id,comment).then((response) => {
    if (response.status == 200) {
      const index = this.comments.findIndex((c) => c.commentId === comment.commentId);
      this.comments.splice(index, 1, comment);
    } else {
     
      console.error('Failed to update post karma.');
    }
  });
},
getYoutubeEmbedUrl(url) {
      // Extract the video ID from the URL
      const videoId = this.getYoutubeVideoId(url);

      // Construct the embed URL
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;

      return embedUrl;
    },
    getYoutubeVideoId(url) {
      // Match the video ID from the URL using a regular expression
      const regex = /(?:\/|v=)([\w-]{11})(?:\?|&|$)/;
      const match = url.match(regex);

      if (match) {
        return match[1];
      } else {
        return null;
      }
    },
    closePostOverlay() {
      this.activeTab = null;
      this.showPostOverlay = false;
      
  },

},

}
</script>

<style scoped>

.airBtn{
  
  margin-bottom:2vh;
  align-content: center;
  font-size:x-large;
  
}


</style>