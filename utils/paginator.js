function paginate(params) {
    let page = parseInt(params.page) || 1

    // Negative number case
    if (page < 0) {
        page *= -1
    }

    const { perPage, totalItems } = params
    const offset = (page - 1) * perPage

    const lastPage = Math.ceil(totalItems / perPage)
    const nextPage = page + 1

    return {
        options: {
            skip: offset,
            limit: perPage,
        },
        totalItems,
        currentPage: page,
        hasPrevious: page > 1,
        hasNext: page * perPage < totalItems,
        previousPage: page - 1,
        nextPage: nextPage >= lastPage ? lastPage : nextPage,
        lastPage,
    }
}

module.exports = {
    paginate,
}
