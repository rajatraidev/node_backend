{   
    // method to submit the form data for new post using AJAX
    let createInterview = function(){
        let interviewForm = $('#interviewForm');

        interviewForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: 'createInterview',
                data: interviewForm.serialize(),
                success: function(data){
                    let newPost = interviewDom(data.data.interview);
                    $('#interview-list').prepend(newPost);
                    console.log('Data Sent');
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
    // method to create a post in DOM
    let interviewDom = function(interview){
        return $(`<tr>
        <td>${ interview.companyName }</td>
        <td>${ interview.positions }</td>
        <td>${ interview.city }</td>
        <td>${ interview.payScale }</td>
        <td>${ interview.createdAt }</td>
        </tr>`)
    }

    // Allocating Result to each student
    let allocateResult = function(){

        $('form[name="resultForm"]').on('submit', function(e) {
            e.preventDefault(e);
            let resultFormId = $(this).attr('id');
            let result  =  $("#"+resultFormId);
            $.ajax({
                type: 'post',
                url: '/interview/allocateResult',
                data: result.serialize(),
                success: function(data){
                   alert('Result Allocated');
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    allocateResult();
    createInterview();
}