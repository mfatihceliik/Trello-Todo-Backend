class Result {
    constructor(message, success) {
        this.message = message
        this.success = success
    }
}

class ErrorResult extends Result {
    constructor(message){
        super(message, false)
    }
}

class SuccessResult extends Result {
    constructor(message){
        super(message, true)
    }
}

class SuccessDataResult extends SuccessResult {
    constructor(data, message) {
        super(message)
        this.data = data
    }
}

class ErrorDataResult extends ErrorResult {
    constructor(data, message) {
        super(message, false)
        this.data = data
    }
}

class PaginationDataResult extends SuccessDataResult {
    constructor(pageInfo, data, message) {
        super(data, message)
        this.pageInfo = pageInfo
    }
}

module.exports = {
    Result,
    ErrorResult,
    SuccessResult,
    SuccessDataResult,
    ErrorDataResult,
    PaginationDataResult
}
