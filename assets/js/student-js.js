

{   
    // method to submit the form data for new post using AJAX
    let createStudent = function(){
        let studentForm = $('#studentForm');

        studentForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: 'createStudent',
                data: studentForm.serialize(),
                success: function(data){
                    let newPost = studentDetail(data.data.student);
                    $('#student-list').prepend(newPost);
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }


   // method to create a post in DOM
   let studentDetail = function(student){
    return $(`<tr>
    <td>${ student.name }</td>
    <td>${ student.email }</td>
    <td>${ student.mobile }</td>
    <td>${ student.college }</td>
    <td>${ student.dsa }</td>
    <td>${ student.webd }</td>
    <td>${ student.react }</td>
    </tr>`)
    }

    

    // Allocating Interview to each student
    let allocateInterview = function(){

        $('form[name="myForm"]').on('submit', function(e) {
            e.preventDefault(e);

            let interviewID = $(this).attr('id');
            let interview  =  $("#"+interviewID);
            $.ajax({
                type: 'post',
                url: '/interview/allocateInterview',
                data: interview.serialize(),
                success: function(data){
                   console.log('allocated');
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });

    }


    allocateInterview();


    createStudent();
}