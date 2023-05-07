import React from 'react'

function AnnouncementItem({announcement, agency}) {
  return (
    <div class="row justify-content-center">
    <div class="col-lg-4 col-md-6">
        <div class="single-blog mt-30">
            <div class="blog-image">
                <img src={announcement.photo} alt="Blog"/>
            </div>
            <div class="blog-content">
                <div class="content">
                    <h4 class="title"><a href="#">{announcement.titre}</a></h4>
                    <span>{announcement.availableStartDate}</span>
                </div>
                <div class="meta d-flex justify-content-between align-items-center">
                    <div class="meta-admin d-flex align-items-center">
                        <div class="image">
                            <a href="#"><img src={agency.photo} alt="Admin"/></a>
                        </div>
                        <div class="admin-title">
                            <h6 class="title"><a href="#">{agency.agencyName}</a></h6>
                        </div>
                    </div> 
                    <div class="meta-icon">
                        <ul>
                            <li><a href="#"><i class="lni-heart"></i></a></li>
                        </ul>
                    </div> 
                </div> 
            </div>
        </div> 
    </div>
  
</div>
  )
}

export default AnnouncementItem