export default {
    data: () => ({
        perPage: 25
    }),
    methods: {
        /**
         * 前一页
         */
        selectPreviousPage() {
            this.updateQueryString({page: this.currentPage - 1})
        },

        /**
         * 下一页
         */
        selectNextPage() {
            this.updateQueryString({page: this.currentPage + 1})
        },
        /**
         * Sync the per page values from the query string.
         */
        initializePerPageFromQueryString() {
            this.perPage = this.currentPerPage
        },

        /**
         * Update the desired amount of resources per page.
         */
        perPageChanged() {
            this.updateQueryString({perPage: this.perPage})
        },
    },

    computed: {
        /**
         * Get the current page from the query string.
         */
        currentPage() {
            return parseInt(this.$route.query.page || 1)
        },
        /**
         * Get the current per page value from the query string.
         */
        currentPerPage() {
            return this.$route.query.perPage || 25
        },
    },
}
