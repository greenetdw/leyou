<template>
  <v-card>
    <v-card-title class="layout row">
      <v-btn color="primary" v-on:click="addBrand">
        新增品牌

      </v-btn>
      <v-spacer/>

      <v-text-field
        label="输入搜索条件"
        append-icon="search"
        single-line
        hide-details
        class="flex sm3"
        v-model="search"
      />
    </v-card-title>
    <v-divider/>
    <v-data-table
      :headers="headers"
      :items="brands"
      :pagination.sync="pagination"
      :total-items="totalBrands"
      :loading="loading"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-center">{{ props.item.id }}</td>
        <td class="text-xs-center">{{ props.item.name }}</td>
        <td class="text-xs-center"><img :src="props.item.image"/></td>
        <td class="text-xs-center">{{ props.item.letter }}</td>
        <td class="justify-center layout px-1">
          <v-btn small color="info" v-on:click="editBrand(props.item)">
            编辑

          </v-btn>
          <v-btn small color="warning">
            删除

          </v-btn>
        </td>
      </template>
    </v-data-table>

    <v-dialog max-width="500" v-model="show" persistent>
      <v-card>
        <!--对话框的标题-->
        <v-toolbar dense dark color="primary">
          <!--<v-toolbar-title>新增品牌</v-toolbar-title>-->
          <v-toolbar-title>{{isEdit?'修改':'新增'}}品牌</v-toolbar-title>
          <v-spacer/>
          <!--关闭窗口的按钮-->
          <v-btn icon v-on:click="closeWindow">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <!--对话框的内容，表单-->
        <v-card-text class="px-5">
          <my-brand-form @close="closeWindow" :oldBrand="oldBrand" :isEdit="isEdit"></my-brand-form>
        </v-card-text>
      </v-card>
    </v-dialog>

  </v-card>


</template>

<script>

  import MyBrandForm from './MyBrandForm'

  export default {
    name: "my-brand",
    data() {
      return {
        headers: [
          {text: "id", value: "id", align: 'center', sortable: true},
          {text: "名称", value: "name", align: 'center', sortable: false},
          {text: "LOGO", value: "image", align: 'center', sortable: false},
          {text: "首字母", value: "letter", align: 'center', sortable: false},
          {text: "操作", align: 'center', sortable: false},
        ],

        brands: [],
        pagination: {},
        totalBrands: 0,
        loading: false,
        search: '',
        show: false,
        oldBrand: {},
        isEdit : false
      }
    },
    watch: {
      pagination: {
        deep: true,
        handler() {
          this.getDataFromServer();
        }
      },
      search() {
        this.getDataFromServer();
      },

    },
    created() {
      this.getDataFromServer();
    },
    components: {
      MyBrandForm
    },
    methods: {
      addBrand() {
        this.isEdit = false;
        this.show = true;
        // 把oldBrand变为null
        this.oldBrand = null;
      },
      editBrand(oldBrand) {
//        this.show = true;
//        this.oldBrand = oldBrand;
        // 根据品牌信息查询商品分类
        this.$http.get("/item/category/bid/" + oldBrand.id)
          .then(({data}) => {
            // 控制弹窗可见：
            this.isEdit = true;
            this.show = true;
            // 获取要编辑的brand
            this.oldBrand = oldBrand
            // 回显商品分类
            this.oldBrand.categories = data;
          })
      },
      closeWindow() {
        this.show = false;
        this.getDataFromServer();
      },
      getDataFromServer() {
        // 开启进度条
        this.loading = true;

        // 发起ajax请求
        // page,rows,key,sortBy, desc
        /*this.$http.get("/item/brand/page", {
         params: {
         page: 1,
         rows: 5,
         sortBy: "id",
         desc: true,
         key: this.search,
         }
         }).then(resp => {
         console.log(resp.data);
         })*/
        this.$http.get("/item/brand/page", {
          params: {
            key: this.search, // 搜索条件
            page: this.pagination.page,// 当前页
            rows: this.pagination.rowsPerPage,// 每页大小
            sortBy: this.pagination.sortBy,// 排序字段
            desc: this.pagination.descending// 是否降序
          }
        }).then(resp => { // 这里使用箭头函数
          // 将得到的数据赋值给本地属性
          this.brands = resp.data.items;
          this.totalBrands = resp.data.total;
          // 完成赋值后，把加载状态赋值为false
          this.loading = false;
        })
      }
    }
  }
</script>

<style scoped>

</style>
