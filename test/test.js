var assert = require('assert');
var ref = require('../purchaseOrder')
var sinon = require('sinon')


describe('purchaseOrder.js', function(){
   describe('accountStatus Behavioural Tests', function(){

    afterEach(function(){
        ref.getBalanceFactor.restore()
        ref.getAgeFactor.restore()
    })

    it('should return not-eligible when given accountFactor=0', function(){
        sinon.stub(ref, 'getBalanceFactor').onCall(0).returns(0)
        sinon.stub(ref, 'getAgeFactor').onCall(0).returns(0)
        assert.equal(ref.accountStatus(), 'not-eligible')
    })

    it('should return very-low when given accountFactor=50', function(){
        sinon.stub(ref, 'getBalanceFactor').onCall(0).returns(5)
        sinon.stub(ref, 'getAgeFactor').onCall(0).returns(10)
        assert.equal(ref.accountStatus(), 'very-low')
    })

    it('should return low when given accountFactor=150', function(){
        sinon.stub(ref, 'getBalanceFactor').onCall(0).returns(15)
        sinon.stub(ref, 'getAgeFactor').onCall(0).returns(10)
        assert.equal(ref.accountStatus(), 'low')
    })

    it('should return medium when given accountFactor=450', function(){
        sinon.stub(ref, 'getBalanceFactor').onCall(0).returns(30)
        sinon.stub(ref, 'getAgeFactor').onCall(0).returns(15)
        assert.equal(ref.accountStatus(), 'medium')
    })

    it('should return high when given accountFactor=750', function(){
        sinon.stub(ref, 'getBalanceFactor').onCall(0).returns(15)
        sinon.stub(ref, 'getAgeFactor').onCall(0).returns(50)
        assert.equal(ref.accountStatus(), 'high')
    })

    it('should return excellent when given accountFactor=1500', function(){
        sinon.stub(ref, 'getBalanceFactor').onCall(0).returns(100)
        sinon.stub(ref, 'getAgeFactor').onCall(0).returns(15)
        assert.equal(ref.accountStatus(), 'excellent')
    })



   })
})

describe('orderHandlingCode.js', function(){
    describe('OrderHandling Behavioural Tests', function(){
 
     afterEach(function(){
         ref.accountStatus.restore()
         ref.creditStatus.restore()
         ref.productStatus.restore()
     })
     
     //EXCELLENT ACCOUNT AND ACCEPTED
     it('should return accepted when accountStatus=excellent, creditStatus=high, productStatus=available-to-all', function(){
         sinon.stub(ref, 'accountStatus').onCall(0).returns('excellent')
         sinon.stub(ref, 'creditStatus').onCall(0).returns('high')
         sinon.stub(ref, 'productStatus').onCall(0).returns('available-to-all')
         assert.equal(ref.orderHandling(), 'accepted')
     })
     it('should return accepted when accountStatus=excellent, creditStatus=high, productStatus=limited', function(){
        sinon.stub(ref, 'accountStatus').onCall(0).returns('excellent')
        sinon.stub(ref, 'creditStatus').onCall(0).returns('high')
        sinon.stub(ref, 'productStatus').onCall(0).returns('limited')
        assert.equal(ref.orderHandling(), 'accepted')
    })
    it('should return accepted when accountStatus=excellent, creditStatus=low, productStatus=available-to-all', function(){
        sinon.stub(ref, 'accountStatus').onCall(0).returns('excellent')
        sinon.stub(ref, 'creditStatus').onCall(0).returns('low')
        sinon.stub(ref, 'productStatus').onCall(0).returns('available-to-all')
        assert.equal(ref.orderHandling(), 'accepted')
    })
    it('should return accepted when accountStatus=excellent, creditStatus=low, productStatus=limited', function(){
        sinon.stub(ref, 'accountStatus').onCall(0).returns('excellent')
        sinon.stub(ref, 'creditStatus').onCall(0).returns('low')
        sinon.stub(ref, 'productStatus').onCall(0).returns('limited')
        assert.equal(ref.orderHandling(), 'accepted')
    })

    //EXCELLENT ACCOUNT AND PENDING
    it('should return pending when accountStatus=excellent, creditStatus=high, productStatus=soldout', function(){
        sinon.stub(ref, 'accountStatus').onCall(0).returns('excellent')
        sinon.stub(ref, 'creditStatus').onCall(0).returns('high')
        sinon.stub(ref, 'productStatus').onCall(0).returns('soldout')
        assert.equal(ref.orderHandling(), 'pending')
    })
    it('should return pending when accountStatus=excellent, creditStatus=low, productStatus=soldout', function(){
        sinon.stub(ref, 'accountStatus').onCall(0).returns('excellent')
        sinon.stub(ref, 'creditStatus').onCall(0).returns('low')
        sinon.stub(ref, 'productStatus').onCall(0).returns('soldout')
        assert.equal(ref.orderHandling(), 'pending')
    })
    it('should return pending when accountStatus=excellent, creditStatus=not-allowed, productStatus=limited', function(){
        sinon.stub(ref, 'accountStatus').onCall(0).returns('excellent')
        sinon.stub(ref, 'creditStatus').onCall(0).returns('not-allowed')
        sinon.stub(ref, 'productStatus').onCall(0).returns('limited')
        assert.equal(ref.orderHandling(), 'pending')
    })
    it('should return pending when accountStatus=excellent, creditStatus=not-allowed, productStatus=limited', function(){
        sinon.stub(ref, 'accountStatus').onCall(0).returns('excellent')
        sinon.stub(ref, 'creditStatus').onCall(0).returns('not-allowed')
        sinon.stub(ref, 'productStatus').onCall(0).returns('limited')
        assert.equal(ref.orderHandling(), 'pending')
    })

    //EXCELLENT AND REJECTED
    it('should return rejected when accountStatus=excellent, creditStatus=not-allowed, productStatus=soldout', function(){
        sinon.stub(ref, 'accountStatus').onCall(0).returns('excellent')
        sinon.stub(ref, 'creditStatus').onCall(0).returns('not-allowed')
        sinon.stub(ref, 'productStatus').onCall(0).returns('soldout')
        assert.equal(ref.orderHandling(), 'rejected')
    })

    //HIGH ACCOUNT AND ACCEPTED
    it('should return accepted when accountStatus=high, creditStatus=high, productStatus=available-to-all', function(){
        sinon.stub(ref, 'accountStatus').onCall(0).returns('high')
        sinon.stub(ref, 'creditStatus').onCall(0).returns('high')
        sinon.stub(ref, 'productStatus').onCall(0).returns('available-to-all')
        assert.equal(ref.orderHandling(), 'accepted')
    })
    it('should return accepted when accountStatus=high, creditStatus=high, productStatus=limited', function(){
        sinon.stub(ref, 'accountStatus').onCall(0).returns('high')
        sinon.stub(ref, 'creditStatus').onCall(0).returns('high')
        sinon.stub(ref, 'productStatus').onCall(0).returns('limited')
        assert.equal(ref.orderHandling(), 'accepted')
    })
    it('should return accepted when accountStatus=high, creditStatus=low, productStatus=available-to-all', function(){
        sinon.stub(ref, 'accountStatus').onCall(0).returns('high')
        sinon.stub(ref, 'creditStatus').onCall(0).returns('low')
        sinon.stub(ref, 'productStatus').onCall(0).returns('available-to-all')
        assert.equal(ref.orderHandling(), 'accepted')
    })

    //HIGH ACCOUNT AND PENDING
    it('should return pending when accountStatus=high, creditStatus=high, productStatus=soldout', function(){
        sinon.stub(ref, 'accountStatus').onCall(0).returns('high')
        sinon.stub(ref, 'creditStatus').onCall(0).returns('high')
        sinon.stub(ref, 'productStatus').onCall(0).returns('soldout')
        assert.equal(ref.orderHandling(), 'pending')
    })
    it('should return pending when accountStatus=high, creditStatus=low, productStatus=limited', function(){
        sinon.stub(ref, 'accountStatus').onCall(0).returns('high')
        sinon.stub(ref, 'creditStatus').onCall(0).returns('low')
        sinon.stub(ref, 'productStatus').onCall(0).returns('limited')
        assert.equal(ref.orderHandling(), 'pending')
    })

    //HIGH ACCOUNT AND REJECTED
    it('should return rejected when accountStatus=high, creditStatus=low, productStatus=soldout', function(){
        sinon.stub(ref, 'accountStatus').onCall(0).returns('high')
        sinon.stub(ref, 'creditStatus').onCall(0).returns('low')
        sinon.stub(ref, 'productStatus').onCall(0).returns('soldout')
        assert.equal(ref.orderHandling(), 'rejected')
    })
    it('should return rejected when accountStatus=high, creditStatus=not-allowed, productStatus=available-to-all', function(){
        sinon.stub(ref, 'accountStatus').onCall(0).returns('high')
        sinon.stub(ref, 'creditStatus').onCall(0).returns('not-allowed')
        sinon.stub(ref, 'productStatus').onCall(0).returns('available-to-all')
        assert.equal(ref.orderHandling(), 'rejected')
    })
    it('should return rejected when accountStatus=high, creditStatus=not-allowed, productStatus=limited', function(){
        sinon.stub(ref, 'accountStatus').onCall(0).returns('high')
        sinon.stub(ref, 'creditStatus').onCall(0).returns('not-allowed')
        sinon.stub(ref, 'productStatus').onCall(0).returns('limited')
        assert.equal(ref.orderHandling(), 'rejected')
    })
    it('should return rejected when accountStatus=high, creditStatus=not-allowed, productStatus=soldout', function(){
        sinon.stub(ref, 'accountStatus').onCall(0).returns('high')
        sinon.stub(ref, 'creditStatus').onCall(0).returns('not-allowed')
        sinon.stub(ref, 'productStatus').onCall(0).returns('soldout')
        assert.equal(ref.orderHandling(), 'rejected')
    })

    //MEDIUM ACCOUNT AND ACCEPTED
    it('should return accepted when accountStatus=medium, creditStatus=high, productStatus=available-to-all', function(){
        sinon.stub(ref, 'accountStatus').onCall(0).returns('medium')
        sinon.stub(ref, 'creditStatus').onCall(0).returns('high')
        sinon.stub(ref, 'productStatus').onCall(0).returns('available-to-all')
        assert.equal(ref.orderHandling(), 'accepted')
    })

    //MEDIUM ACCOUNT AND PENDING
    it('should return pending when accountStatus=medium, creditStatus=high, productStatus=limited', function(){
        sinon.stub(ref, 'accountStatus').onCall(0).returns('medium')
        sinon.stub(ref, 'creditStatus').onCall(0).returns('high')
        sinon.stub(ref, 'productStatus').onCall(0).returns('limited')
        assert.equal(ref.orderHandling(), 'pending')
    })

    //MEDIUM ACCOUNT AND REJECTED
    it('should return rejected when accountStatus=medium, creditStatus=high, productStatus=soldout', function(){
        sinon.stub(ref, 'accountStatus').onCall(0).returns('medium')
        sinon.stub(ref, 'creditStatus').onCall(0).returns('high')
        sinon.stub(ref, 'productStatus').onCall(0).returns('soldout')
        assert.equal(ref.orderHandling(), 'rejected')
    })
    it('should return rejected when accountStatus=medium, creditStatus=low, productStatus=available-to-all', function(){
        sinon.stub(ref, 'accountStatus').onCall(0).returns('medium')
        sinon.stub(ref, 'creditStatus').onCall(0).returns('low')
        sinon.stub(ref, 'productStatus').onCall(0).returns('available-to-all')
        assert.equal(ref.orderHandling(), 'rejected')
    })
    it('should return rejected when accountStatus=medium, creditStatus=low, productStatus=limited', function(){
        sinon.stub(ref, 'accountStatus').onCall(0).returns('medium')
        sinon.stub(ref, 'creditStatus').onCall(0).returns('low')
        sinon.stub(ref, 'productStatus').onCall(0).returns('limited')
        assert.equal(ref.orderHandling(), 'rejected')
    })
    it('should return rejected when accountStatus=medium, creditStatus=low, productStatus=soldout', function(){
        sinon.stub(ref, 'accountStatus').onCall(0).returns('medium')
        sinon.stub(ref, 'creditStatus').onCall(0).returns('low')
        sinon.stub(ref, 'productStatus').onCall(0).returns('soldout')
        assert.equal(ref.orderHandling(), 'rejected')
    })
    it('should return rejected when accountStatus=medium, creditStatus=not-allowed, productStatus=available-to-all', function(){
        sinon.stub(ref, 'accountStatus').onCall(0).returns('medium')
        sinon.stub(ref, 'creditStatus').onCall(0).returns('not-allowed')
        sinon.stub(ref, 'productStatus').onCall(0).returns('available-to-all')
        assert.equal(ref.orderHandling(), 'rejected')
    })
    it('should return rejected when accountStatus=medium, creditStatus=not-allowed, productStatus=limited', function(){
        sinon.stub(ref, 'accountStatus').onCall(0).returns('medium')
        sinon.stub(ref, 'creditStatus').onCall(0).returns('not-allowed')
        sinon.stub(ref, 'productStatus').onCall(0).returns('limited')
        assert.equal(ref.orderHandling(), 'rejected')
    })
    it('should return rejected when accountStatus=medium, creditStatus=not-allowed, productStatus=soldout', function(){
        sinon.stub(ref, 'accountStatus').onCall(0).returns('medium')
        sinon.stub(ref, 'creditStatus').onCall(0).returns('not-allowed')
        sinon.stub(ref, 'productStatus').onCall(0).returns('soldout')
        assert.equal(ref.orderHandling(), 'rejected')
    })

    //LOW ACCOUNT AND PENDING
    it('should return pending when accountStatus=low, creditStatus=high, productStatus=available-to-all', function(){
        sinon.stub(ref, 'accountStatus').onCall(0).returns('low')
        sinon.stub(ref, 'creditStatus').onCall(0).returns('high')
        sinon.stub(ref, 'productStatus').onCall(0).returns('available-to-all')
        assert.equal(ref.orderHandling(), 'pending')
    })
    it('should return pending when accountStatus=low, creditStatus=high, productStatus=limited', function(){
        sinon.stub(ref, 'accountStatus').onCall(0).returns('low')
        sinon.stub(ref, 'creditStatus').onCall(0).returns('high')
        sinon.stub(ref, 'productStatus').onCall(0).returns('limited')
        assert.equal(ref.orderHandling(), 'pending')
    })

    //LOW ACCOUNT AND REJECTED
    it('should return rejected when accountStatus=low, creditStatus=high, productStatus=soldout', function(){
        sinon.stub(ref, 'accountStatus').onCall(0).returns('low')
        sinon.stub(ref, 'creditStatus').onCall(0).returns('high')
        sinon.stub(ref, 'productStatus').onCall(0).returns('soldout')
        assert.equal(ref.orderHandling(), 'rejected')
    })
    it('should return rejected when accountStatus=low, creditStatus=low, productStatus=available-to-all', function(){
        sinon.stub(ref, 'accountStatus').onCall(0).returns('low')
        sinon.stub(ref, 'creditStatus').onCall(0).returns('low')
        sinon.stub(ref, 'productStatus').onCall(0).returns('available-to-all')
        assert.equal(ref.orderHandling(), 'rejected')
    })
    it('should return rejected when accountStatus=low, creditStatus=low, productStatus=limited', function(){
        sinon.stub(ref, 'accountStatus').onCall(0).returns('low')
        sinon.stub(ref, 'creditStatus').onCall(0).returns('low')
        sinon.stub(ref, 'productStatus').onCall(0).returns('limited')
        assert.equal(ref.orderHandling(), 'rejected')
    })
    it('should return rejected when accountStatus=low, creditStatus=low, productStatus=soldout', function(){
        sinon.stub(ref, 'accountStatus').onCall(0).returns('low')
        sinon.stub(ref, 'creditStatus').onCall(0).returns('low')
        sinon.stub(ref, 'productStatus').onCall(0).returns('soldout')
        assert.equal(ref.orderHandling(), 'rejected')
    })
    it('should return rejected when accountStatus=low, creditStatus=not-allowed, productStatus=available-to-all', function(){
        sinon.stub(ref, 'accountStatus').onCall(0).returns('low')
        sinon.stub(ref, 'creditStatus').onCall(0).returns('not-allowed')
        sinon.stub(ref, 'productStatus').onCall(0).returns('available-to-all')
        assert.equal(ref.orderHandling(), 'rejected')
    })
    it('should return rejected when accountStatus=low, creditStatus=not-allowed, productStatus=limited', function(){
        sinon.stub(ref, 'accountStatus').onCall(0).returns('low')
        sinon.stub(ref, 'creditStatus').onCall(0).returns('not-allowed')
        sinon.stub(ref, 'productStatus').onCall(0).returns('limited')
        assert.equal(ref.orderHandling(), 'rejected')
    })
    it('should return rejected when accountStatus=low, creditStatus=not-allowed, productStatus=soldout', function(){
        sinon.stub(ref, 'accountStatus').onCall(0).returns('low')
        sinon.stub(ref, 'creditStatus').onCall(0).returns('not-allowed')
        sinon.stub(ref, 'productStatus').onCall(0).returns('soldout')
        assert.equal(ref.orderHandling(), 'rejected')
    })

    //VERY-LOW ACCOUNT AND PENDING
    it('should return pending when accountStatus=very-low, creditStatus=high, productStatus=available-to-all', function(){
        sinon.stub(ref, 'accountStatus').onCall(0).returns('very-low')
        sinon.stub(ref, 'creditStatus').onCall(0).returns('high')
        sinon.stub(ref, 'productStatus').onCall(0).returns('available-to-all')
        assert.equal(ref.orderHandling(), 'pending')
    })

    //VERY-LOW ACCOUNT AND REJECTED
    it('should return rejected when accountStatus=very-low, creditStatus=high, productStatus=limited', function(){
        sinon.stub(ref, 'accountStatus').onCall(0).returns('very-low')
        sinon.stub(ref, 'creditStatus').onCall(0).returns('high')
        sinon.stub(ref, 'productStatus').onCall(0).returns('limited')
        assert.equal(ref.orderHandling(), 'rejected')
    })
    it('should return rejected when accountStatus=very-low, creditStatus=high, productStatus=soldout', function(){
        sinon.stub(ref, 'accountStatus').onCall(0).returns('very-low')
        sinon.stub(ref, 'creditStatus').onCall(0).returns('high')
        sinon.stub(ref, 'productStatus').onCall(0).returns('soldout')
        assert.equal(ref.orderHandling(), 'rejected')
    })
    it('should return rejected when accountStatus=very-low, creditStatus=low, productStatus=available-to-all', function(){
        sinon.stub(ref, 'accountStatus').onCall(0).returns('very-low')
        sinon.stub(ref, 'creditStatus').onCall(0).returns('low')
        sinon.stub(ref, 'productStatus').onCall(0).returns('available-to-all')
        assert.equal(ref.orderHandling(), 'rejected')
    })
    it('should return rejected when accountStatus=very-low, creditStatus=low, productStatus=limited', function(){
        sinon.stub(ref, 'accountStatus').onCall(0).returns('very-low')
        sinon.stub(ref, 'creditStatus').onCall(0).returns('low')
        sinon.stub(ref, 'productStatus').onCall(0).returns('limited')
        assert.equal(ref.orderHandling(), 'rejected')
    })
    it('should return rejected when accountStatus=very-low, creditStatus=low, productStatus=soldout', function(){
        sinon.stub(ref, 'accountStatus').onCall(0).returns('very-low')
        sinon.stub(ref, 'creditStatus').onCall(0).returns('low')
        sinon.stub(ref, 'productStatus').onCall(0).returns('soldout')
        assert.equal(ref.orderHandling(), 'rejected')
    })
    it('should return rejected when accountStatus=very-low, creditStatus=not-available, productStatus=available-to-all', function(){
        sinon.stub(ref, 'accountStatus').onCall(0).returns('very-low')
        sinon.stub(ref, 'creditStatus').onCall(0).returns('not-allowed')
        sinon.stub(ref, 'productStatus').onCall(0).returns('available-to-all')
        assert.equal(ref.orderHandling(), 'rejected')
    })
    it('should return rejected when accountStatus=very-low, creditStatus=not-available, productStatus=limited', function(){
        sinon.stub(ref, 'accountStatus').onCall(0).returns('very-low')
        sinon.stub(ref, 'creditStatus').onCall(0).returns('not-allowed')
        sinon.stub(ref, 'productStatus').onCall(0).returns('limited')
        assert.equal(ref.orderHandling(), 'rejected')
    })
    it('should return rejected when accountStatus=very-low, creditStatus=not-available, productStatus=soldout', function(){
        sinon.stub(ref, 'accountStatus').onCall(0).returns('very-low')
        sinon.stub(ref, 'creditStatus').onCall(0).returns('not-allowed')
        sinon.stub(ref, 'productStatus').onCall(0).returns('soldout')
        assert.equal(ref.orderHandling(), 'rejected')
    })

    //NOT-ELIGIBLE AND REJECTED
    it('should return rejected when accountStatus=not-eligible, creditStatus=high, productStatus=available-to-all', function(){
        sinon.stub(ref, 'accountStatus').onCall(0).returns('not-eligible')
        sinon.stub(ref, 'creditStatus').onCall(0).returns('high')
        sinon.stub(ref, 'productStatus').onCall(0).returns('available-to-all')
        assert.equal(ref.orderHandling(), 'rejected')
    })
    it('should return rejected when accountStatus=not-eligible, creditStatus=high, productStatus=limited', function(){
        sinon.stub(ref, 'accountStatus').onCall(0).returns('not-eligible')
        sinon.stub(ref, 'creditStatus').onCall(0).returns('high')
        sinon.stub(ref, 'productStatus').onCall(0).returns('limited')
        assert.equal(ref.orderHandling(), 'rejected')
    })
    it('should return rejected when accountStatus=not-eligible, creditStatus=high, productStatus=soldout', function(){
        sinon.stub(ref, 'accountStatus').onCall(0).returns('not-eligible')
        sinon.stub(ref, 'creditStatus').onCall(0).returns('high')
        sinon.stub(ref, 'productStatus').onCall(0).returns('soldout')
        assert.equal(ref.orderHandling(), 'rejected')
    })
    it('should return rejected when accountStatus=not-eligible, creditStatus=low, productStatus=available-to-all', function(){
        sinon.stub(ref, 'accountStatus').onCall(0).returns('not-eligible')
        sinon.stub(ref, 'creditStatus').onCall(0).returns('low')
        sinon.stub(ref, 'productStatus').onCall(0).returns('available-to-all')
        assert.equal(ref.orderHandling(), 'rejected')
    })
    it('should return rejected when accountStatus=not-eligible, creditStatus=low, productStatus=limited', function(){
        sinon.stub(ref, 'accountStatus').onCall(0).returns('not-eligible')
        sinon.stub(ref, 'creditStatus').onCall(0).returns('low')
        sinon.stub(ref, 'productStatus').onCall(0).returns('limited')
        assert.equal(ref.orderHandling(), 'rejected')
    })
    it('should return rejected when accountStatus=not-eligible, creditStatus=low, productStatus=soldout', function(){
        sinon.stub(ref, 'accountStatus').onCall(0).returns('not-eligible')
        sinon.stub(ref, 'creditStatus').onCall(0).returns('low')
        sinon.stub(ref, 'productStatus').onCall(0).returns('soldout')
        assert.equal(ref.orderHandling(), 'rejected')
    })
    it('should return rejected when accountStatus=not-eligible, creditStatus=not-allowed, productStatus=available-to-all', function(){
        sinon.stub(ref, 'accountStatus').onCall(0).returns('not-eligible')
        sinon.stub(ref, 'creditStatus').onCall(0).returns('not-allowed')
        sinon.stub(ref, 'productStatus').onCall(0).returns('available-to-all')
        assert.equal(ref.orderHandling(), 'rejected')
    })
    it('should return rejected when accountStatus=not-eligible, creditStatus=not-allowed, productStatus=limited', function(){
        sinon.stub(ref, 'accountStatus').onCall(0).returns('not-eligible')
        sinon.stub(ref, 'creditStatus').onCall(0).returns('not-allowed')
        sinon.stub(ref, 'productStatus').onCall(0).returns('limited')
        assert.equal(ref.orderHandling(), 'rejected')
    })
    it('should return rejected when accountStatus=not-eligible, creditStatus=not-allowed, productStatus=soldout', function(){
        sinon.stub(ref, 'accountStatus').onCall(0).returns('not-eligible')
        sinon.stub(ref, 'creditStatus').onCall(0).returns('not-allowed')
        sinon.stub(ref, 'productStatus').onCall(0).returns('soldout')
        assert.equal(ref.orderHandling(), 'rejected')
    })

    })
 })
 