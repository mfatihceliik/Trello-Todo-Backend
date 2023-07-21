class Pagination {
    
    constructor(totalItems, totalPages, currentPage, currentSize) {
        this.totalItems = totalItems
        this.totalPages = totalPages
        this.currentPage = currentPage
        this.currentSize = currentSize
    }
}
module.exports = Pagination