import React from 'react'
import OndemandVideoTwoToneIcon from '@material-ui/icons/OndemandVideoTwoTone';
import BookTwoToneIcon from '@material-ui/icons/BookTwoTone';
import CreateTwoToneIcon from '@material-ui/icons/CreateTwoTone';
import ImportContactsTwoToneIcon from '@material-ui/icons/ImportContactsTwoTone';
import LibraryBooksTwoToneIcon from '@material-ui/icons/LibraryBooksTwoTone';
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';
function Material() {
    return (
        <div class="container py-2">
            {/* For teacher */}
            <div class="material__options">
                <div className="row teacher__option">
                    <div className="col h-100">
                        <div class="container material__options__items bg1 text-light">
                        <LibraryBooksTwoToneIcon fontSize="large"/>
                            <span> Add Study Material</span>
                        </div>
                    </div>
                    <div className="col h-100">
                        <div class="container material__options__items bg1 text-light">
                            <ImportContactsTwoToneIcon fontSize="large"/>
                            <span> Add Assingment</span>
                        </div>
                    </div>
                    <div className="col h-100">
                        <div class="container material__options__items bg1 text-light">
                            <AddCircleTwoToneIcon fontSize="large"/>
                            <span> Add Exam</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="material__options">
                <div className="row">
                    <div className="col h-100">
                        <div class="container material__options__items">
                            <OndemandVideoTwoToneIcon fontSize="large"/>
                            <span> Video <span>Lectures</span></span>
                        </div>
                    </div>
                    <div className="col h-100">
                        <div class="container material__options__items">
                            <BookTwoToneIcon fontSize="large"/>
                            <span> Homeworks</span>
                        </div>
                    </div>
                    <div className="col h-100">
                        <div class="container material__options__items">
                            <CreateTwoToneIcon fontSize="large"/>
                            <span> Exams</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Material
