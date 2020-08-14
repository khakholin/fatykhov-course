import React, { Fragment, useEffect, useState } from 'react';

import './courseListStyle.scss';
import { appRequest } from '../../../../modules/app/appRequest';
import { ICourseData } from '../../../../types/inputPropsFormats';
import { Button, CircularProgress } from '@material-ui/core';
import InputField from '../../../../components/common/InputField/InputField';
import { defaultTranslation } from '../../../../constants/translation';

export interface ICourseListProps { }

const CourseList = (props: ICourseListProps) => {
    useEffect(() => {
        setTimeout(() => setIsLoader(false), 1000);
        appRequest('/api/course/data', 'GET')
            .then(response => {
                setCourseList(response.data);
            });
    }, []);
    const [courseList, setCourseList] = useState([]);
    const [courseName, setCourseName] = useState('');
    const [courseNameError, setCourseNameError] = useState({ showCheck: false, status: false, text: '' });
    const [courseFolder, setCourseFolder] = useState('');
    const [courseFolderError, setCourseFolderError] = useState({ showCheck: false, status: false, text: '' });
    const [courseTime, setCourseTime] = useState('');
    const [courseTimeError, setCourseTimeError] = useState({ showCheck: false, status: false, text: '' });
    const [numOfLectures, setNumOfLectures] = useState('');
    const [numOfLecturesError, setNumOfLecturesError] = useState({ showCheck: false, status: false, text: '' });
    const [isCreateMode, setIsCreateMode] = useState(false);
    const [isLoader, setIsLoader] = useState(true);

    const onSaveClick = () => {
        setIsCreateMode(true);
    }

    const createTestCourse = () => {
        // запрос на создание тестового курса:
        appRequest('/api/course/create', 'POST', {
            courseName: "REACT", courseFolder: "React", courseTime: 272, numOfLectures: 8,
            courseLectures: [
                {
                    lectureTime: 34,
                    lectureTitle: "Intro"
                },
                {
                    lectureTime: 34,
                    lectureTitle: "About"
                },
                {
                    lectureTime: 34,
                    lectureTitle: "Hooks"
                },
                {
                    lectureTime: 34,
                    lectureTitle: "Redux"
                },
                {
                    lectureTime: 34,
                    lectureTitle: "Saga"
                },
                {
                    lectureTime: 34,
                    lectureTitle: "Request"
                },
                {
                    lectureTime: 34,
                    lectureTitle: "RXJS"
                },
                {
                    lectureTime: 34,
                    lectureTitle: "Resume"
                }
            ]
        }).then((response) => {
            console.log(response);
        });
    }

    const clearData = () => {
        setCourseFolder('');
        setCourseFolderError({ showCheck: false, status: false, text: '' });
        setCourseName('');
        setCourseNameError({ showCheck: false, status: false, text: '' });
    }

    const courseNameChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCourseName(event.target.value);
        if (event.target.value.length) {
            setCourseNameError({ showCheck: true, status: false, text: '' });
        } else {
            setCourseNameError({ showCheck: false, status: false, text: '' });
        }
    };

    const courseFolderChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCourseFolder(event.target.value);
        if (event.target.value.length) {
            setCourseFolderError({ showCheck: true, status: false, text: '' });
        } else {
            setCourseFolderError({ showCheck: false, status: false, text: '' });
        }
    };

    const courseTimeChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCourseTime(event.target.value);
        if (event.target.value.length) {
            setCourseTimeError({ showCheck: true, status: false, text: '' });
        } else {
            setCourseTimeError({ showCheck: false, status: false, text: '' });
        }
    };

    const numOfLecturesChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNumOfLectures(event.target.value);
        if (event.target.value.length) {
            setNumOfLecturesError({ showCheck: true, status: false, text: '' });
        } else {
            setNumOfLecturesError({ showCheck: false, status: false, text: '' });
        }
    };

    return (
        <Fragment>
            <div className="personal-account-info-header">
                <div className="personal-account-info-header__title">Список курсов</div>
                <div className="personal-account-info-header__description">
                    Редактирование курсов
                    <br></br>
                    <span>доступно только администраторам</span>
                </div>
            </div>
            <div className="course-list-component personal-account-info-body">
                {
                    isLoader ?
                        <div className="info-form-spinner__wrapper">
                            <CircularProgress
                                className="info-form-spinner__item"
                                size={100}
                                thickness={3}
                            />
                        </div>
                        : (
                            isCreateMode ?
                                <Fragment>
                                    <InputField
                                        error={courseNameError}
                                        field={{
                                            name: 'courseName',
                                            title: defaultTranslation.courseName,
                                            placeholder: 'Курс',
                                        }}
                                        handleChange={courseNameChange}
                                        value={courseName}
                                    />
                                    <InputField
                                        error={courseFolderError}
                                        field={{
                                            name: 'courseFolder',
                                            title: defaultTranslation.courseFolder,
                                            placeholder: 'Папка',
                                        }}
                                        handleChange={courseFolderChange}
                                        value={courseFolder}
                                    />
                                    <InputField
                                        error={courseTimeError}
                                        field={{
                                            name: 'courseTime',
                                            title: 'Продолжительность курса в минутах',
                                            placeholder: '1337',
                                        }}
                                        handleChange={courseTimeChange}
                                        value={courseTime}
                                    />
                                    <InputField
                                        error={numOfLecturesError}
                                        field={{
                                            name: 'numOfLectures',
                                            title: 'Количество лекций',
                                            placeholder: '10',
                                        }}
                                        handleChange={numOfLecturesChange}
                                        value={numOfLectures}
                                    />
                                    <div className="course-list-component-lectures">
                                        <div className="course-list-component-lectures__header">
                                            <div className="course-list-component-lectures__header-add">+</div>
                                            <div className="course-list-component-lectures__header-description">
                                                <div className="course-list-component-lectures__header-text">Добавить лекцию</div>
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        className="button-primary"
                                        variant="outlined"
                                        onClick={() => {
                                            setIsCreateMode(false);
                                            clearData();
                                        }}
                                    >
                                        Список курсов
                                    </Button>
                                </Fragment>
                                : <Fragment>
                                    <div className="course-list-component__content">
                                        {

                                            courseList.length && courseList.map((course: ICourseData) => {
                                                return (
                                                    <div
                                                        className="course-list-component__item"
                                                        key={course.courseName}
                                                    // onClick={() => props.onUserProfileClick(user)}
                                                    >
                                                        {course.courseName}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className="course-list-component__button">
                                        <Button
                                            className="button-primary"
                                            variant="outlined"
                                            onClick={() => onSaveClick()}
                                        >
                                            Создать курс
                                        </Button>
                                        <Button
                                            className="button-primary"
                                            variant="outlined"
                                            onClick={() => createTestCourse()}
                                        >
                                            Создать тестовый курс
                                        </Button>
                                    </div>
                                </Fragment>
                        )
                }
            </div>
        </Fragment>
    );
};

export default CourseList;
