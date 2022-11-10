<template>
  <div>
    <div class="card">
      <div class="card-body">
        <div
          class="list-group mb-2"
          v-for="article in articles"
          v-bind:key="article.id"
        >
          <div>
            <a
              href="#"
              class="
                list-group-item list-group-item-action
                flex-column
                align-items-start
              "
            >
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">{{ article.title }}</h5>
              </div>
              <p class="mb-1">{{ article.body }}</p>
            </a>
          </div>
          <div class="float-right">
            <button
              @click.prevent="fireModal(article)"
              type="button"
              class="btn btn-outline-secondary"
            >
              Edit
            </button>
            <button
              @click.prevent="deleteArticle(article.id)"
              type="button"
              class="btn btn-outline-secondary"
            >
              Delete
            </button>
          </div>
        </div>
        <nav class="float-right" aria-label="Page navigation">
          <ul class="pagination">
            <li
              v-bind:class="[{ disabled: !pagination.prev_page_url }]"
              class="page-item"
            >
              <a
                class="page-link"
                href="#"
                @click="fetchData(pagination.prev_page_url)"
                >Previous</a
              >
            </li>
            <li class="page-item disabled">
              <a class="page-link text-dark" href="#"
                >Page {{ pagination.current_page }} of
                {{ pagination.last_page }}</a
              >
            </li>
            <li
              v-bind:class="[{ disabled: !pagination.next_page_url }]"
              class="page-item"
            >
              <a
                class="page-link"
                href="#"
                @click="fetchData(pagination.next_page_url)"
                >Next</a
              >
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <!-- modal -->
    <div>
      <div class="modal fade" id="editArticleModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Update Article</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="formGroupExampleInput">Title</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="Title of the Article"
                    v-model="article.title"
                  />
                </div>
                <div class="form-group">
                  <label for="formGroupExampleInput2">Body</label>
                  <input
                    type="text"
                    class="form-control"
                    id="body"
                    placeholder="Body of the Article"
                    v-model="article.body"
                  />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                @click.prevent="updateArticle(id)"
                type="button"
                class="btn btn-primary"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from "../eventBus";

export default {
  data() {
    return {
      article: {  
        id: "",
        title: "",
        body: "",
      },
      articles: [],
      pagination: {},
    };
  },
  mounted() {
    let self = this;
    this.fetchData();
    EventBus.$on("event-name", function (data) {
      // console.log(data);
      if (data) {
        self.fetchData();
      }
    });
  },
  methods: {
    fetchData(page_url) {
      page_url = page_url || "api/get-articles";
      axios.post(page_url).then((res) => {
        // console.log(res.data.articles);
        this.articles = res.data.articles.data;
        this.makePagination(res.data.articles);
      });
    },
    makePagination(articles) {
      let pagination = {
        current_page: articles.current_page,
        last_page: articles.last_page,
        next_page_url: articles.next_page_url,
        prev_page_url: articles.prev_page_url,
      };
      // console.log(pagination);
      this.pagination = pagination;
    },
    deleteArticle(id) {
      // console.log(id);
      axios.post(`api/delete-article/${id}`).then((res) => {
        this.fetchData();
      });
    },
    fireModal(article) {
      // console.log(article);
      this.article.id = article.id;
      this.article.title = article.title;
      this.article.body = article.body;
      $("#editArticleModal").modal("show");
    },
    updateArticle(id) {
      // console.log(id);
    },
  },name:"article"
};
</script>