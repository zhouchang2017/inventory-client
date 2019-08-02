import debounce from 'lodash/debounce'

export default {
    data: () => ({
        search: '',
        selectedResource: '',
        availableResources: [],
        filters: {}
    }),

    methods: {

        /**
         * Perform a search to get the relatable resources.
         */
        performSearch(search) {
            this.search = search

            const trimmedSearch = search.trim()
            // If the user performs an empty search, it will load all the results
            // so let's just set the availableResources to an empty array to avoid
            // loading a huge result set
            if (trimmedSearch == '') {
                this.clearSelection()

                return
            }

            this.debouncer(() => {
                this.selectedResource = ''
                this.getAvailableResources(trimmedSearch)
            }, 500)
        },

        /**
         * Debounce function for the search handler
         */
        debouncer: debounce(callback => callback(), 500),
    },

    computed: {
        filtersToBase64() {

        }
    }
}
