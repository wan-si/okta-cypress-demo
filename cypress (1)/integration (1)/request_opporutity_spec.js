describe("opportunity",function(){
    before(function () {
        cy.oktaLogin();
    })

    context("when post opportunity request", function(){
        it("post an opportunity", function () {
            const postOpportunityReuqest = {
                method: 'Post',
                url:salesFunnelURL,
                body:requestBody
            }
            cy.request(postOpportunityReuqest).then(resq =>{
                expect(resp.status).to.eq(200)
                let resbody = resp.body
                expect(resbody).to.eq(responseBody)
                }
            )
            
        })
    })
})