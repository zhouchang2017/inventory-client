<template>
    <div class="flex flex-col">
        <div class="flex mb-3 ">
            <h1 class="text-90 font-normal text-2xl flex-shrink-0">{{ pageTitle }}</h1>
            <div class="flex w-full justify-end">
                <router-link class="el-button el-button--primary" :to="{name:createRouteName}">
                    {{ createButtonName }}
                </router-link>
            </div>
        </div>

        <div class="overflow-hidden rounded-lg flex flex-wrap justify-start items-center mb-5">
            <!--filter form-->
            <div class="flex items-center mr-3 mb-3">
                <label class="text-gray-500 text-sm font-bold block mr-3 flex-shrink-0">
                    上市时间
                </label>
                <el-date-picker
                        id="date"
                        size="small"
                        v-model="queryParams.date"
                        type="daterange"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="['00:00:00', '23:59:59']">
                </el-date-picker>
            </div>

            <div class="flex items-center mr-3 mb-3">
                <label class="text-gray-500 text-sm font-bold mr-3 flex-shrink-0">
                    编码
                </label>
                <el-input size="small" v-model="queryParams.code" placeholder="请输入搜索产品编码">

                </el-input>
            </div>

            <div class="flex items-center mr-3 mb-3">
                <label class="text-gray-500 text-sm font-bold mr-3 flex-shrink-0">
                    品牌
                </label>
                <el-input size="small" v-model="queryParams.brand" placeholder="请输入搜索产品品牌">

                </el-input>
            </div>


            <span class="ml-auto mb-3">
                <button class="btn-icon p-1 mr-2">
                    <RefreshIcon class="text-80"/>
                </button>
                <button class="btn-icon p-1">
                <SearchIcon class="text-80"/>
            </button>
            </span>


        </div>
        <div>
            <el-table
                    :key="tableKey"
                    v-loading="listLoading"
                    :data="list"
                    class="rounded-lg overflow-hidden"
                    fit
                    highlight-current-row
                    style="width: 100%;"
                    @sort-change="sortChange"
            >
                <el-table-column label="ID" prop="id" sortable="custom" width="100" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.id }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="上市时间" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.arrived_at }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="编码" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.code }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="价格" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.price }}</span>
                    </template>
                </el-table-column>


                <el-table-column label="Actions" align="center" class-name="small-padding fixed-width">
                    <template slot-scope="{row}">
                        <div class="flex flex-row justify-center items-center text-gray-500">
                            <router-link :to="{name:viewRouteName,params:{id:row.id}}"
                                         class="cursor-pointer text-70 hover:text-primary mr-3">
                                <ViewIcon/>
                            </router-link>
                            <router-link :to="{name:editRouteName,params:{id:row.id}}"
                                         class="cursor-pointer text-70 hover:text-primary mr-3" title="Edit">
                                <EditIcon/>
                            </router-link>

                            <div title="Delete" @click="deleteResourceHandler(row.id)"
                                 class="appearance-none cursor-pointer text-70 hover:text-primary">
                                <DeleteIcon/>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <div slot="append">
                    <div class="flex justify-center bg-gray-100 py-3 px-2">
                        <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="listQuery.page"
                                :page-sizes="[5, 10, 15, 100]"
                                :page-size="15"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="listQuery.total">
                        </el-pagination>
                    </div>
                </div>
            </el-table>
        </div>
    </div>
</template>

<script>
    import resourceInfo from './resource'

    export default {
        name: 'Index',
        mixins: [resourceInfo],
        data() {
            return {

                listQuery: {
                    page: 1,
                    limit: 20,
                    importance: undefined,
                    title: undefined,
                    type: undefined,
                    sort: '+id'
                },

                queryParams: {
                    date: '',
                    code: '',
                    brand: ''
                },

                listLoading: false,
                list: null,
                total: 0,
                importanceOptions: [1, 2, 3],
                tableKey: 0
            }
        },

        methods: {
            getList() {

                const filters = {
                    brand: [{value: 1, symbol: '='}],
                    arrived_at: [{value: "2019-07-20", symbol: '>'}, {value: "2019-07-22", symbol: '<'}]
                }

                let filterStr = btoa(JSON.stringify(filters))

                this.listLoading = true
                this.listQuery.filters = filterStr
                this.getResources(this.listQuery).then(({data}) => {
                    this.list = data.data
                    this.total = data.total
                    this.listLoading = false
                })
            },

            handleFilter() {
                this.listQuery.page = 1
                this.getList()
            },

            sortChange(data) {
                const {prop, order} = data
                if (prop === 'id') {
                    this.sortByID(order)
                }
            },

            sortByID(order) {
                if (order === 'ascending') {
                    this.listQuery.sort = '+id'
                } else {
                    this.listQuery.sort = '-id'
                }
                this.handleFilter()
            },

            handleSizeChange(val) {
                console.log(`每页 ${val} 条`)
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`)
            },

        },

        created() {
            this.getList()
        }
    }
</script>

<style scoped>

</style>
