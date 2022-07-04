<template>
    <div>
        <el-tree ref="menuTree" :data="data" show-checkbox node-key="value" :default-expand-all="true"
            :props="defaultProps">
        </el-tree>
    </div>
</template>
    <script>
    export default {
        data() {
            return {
                data: [],
                defaultProps: {
                    //id: 'value',
                    children: 'children',
                    label: 'label'
                }
            };
        },
        props: {
            roleId: {
                type: Number,
            },
        },
        created() {
            this.$http.get("api/Menu/GetList").then(res=>{
                var reg = new RegExp('\\,"children":\\[]',"g")
                this.data = JSON.parse(JSON.stringify(res.data).replace(reg,""))
            })
        },
        methods: {
            getdata() {
                var list = this.$refs.menuTree.getCheckedNodes(true,true).map(m => m.value);
                console.log(list);
            }
        },
    };
    </script>
