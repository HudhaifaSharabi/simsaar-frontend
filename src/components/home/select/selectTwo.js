'use client'
import React, { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
const Select = dynamic(()=>import('react-select'),{ssr:false})
import {FiDollarSign, FiHome,FiSearch} from "../../assets/icons/vander"

export default function SelectTwo(){
    let [activeIndex, setActiveIndex] = useState(0)
    let categories = [
        { value: '1', label: 'Houses' },
        { value: '2', label: 'Apartment' },
        { value: '3', label: 'Offices' },
        { value: '4', label: 'Townhome' },
    ]
    let price = [
        { value: '1', label: '500' },
        { value: '1', label: '500' },
        { value: '2', label: '1000' },
        { value: '3', label: '2000' },
        { value: '4', label: '3000' },
        { value: '5', label: '4000' },
        { value: '6', label: '5000' },
        { value: '7', label: '5000' },
    ]
    return(
        <div className="mt-4">
            <ul className="nav nav-pills bg-white shadow border-bottom p-3 flex-row d-md-inline-flex nav-justified mb-0 rounded-top-3 position-relative overflow-hidden" id="pills-tab" role="tablist">
                <li className="nav-item m-1">
                    <Link className={`${activeIndex === 0 ? 'active' : '' } nav-link py-2 px-4  rounded-3 fw-medium`} href="#" scroll={false} onClick={()=>setActiveIndex(0)} >
                        Buy
                    </Link>
                </li>
                
                <li className="nav-item m-1">
                    <Link className={`${activeIndex === 1 ? 'active' : '' } nav-link py-2 px-4  rounded-3 fw-medium`} href="#" scroll={false} onClick={()=>setActiveIndex(1)}>
                        Sell
                    </Link>
                </li>

                <li className="nav-item m-1">
                    <Link className={`${activeIndex === 2 ? 'active' : '' } nav-link py-2 px-4  rounded-3 fw-medium`} href="#" scroll={false} onClick={()=>setActiveIndex(2)}>
                        Rent
                    </Link>
                </li>
            </ul>
            <div className="tab-content bg-white rounded-3 sm-rounded-0 shadow">
                {activeIndex === 0 ? 
                    <div className="card border-0 active">
                        <form className="card-body text-start">
                            <div className="registration-form text-dark text-start">
                                <div className="row g-lg-0">
                                    <div className="col-lg-3 col-md-6 col-12">
                                        <div className="mb-3">
                                            <label className="form-label fs-6">Search :</label>
                                            <div className="filter-search-form position-relative filter-border">
                                                <FiSearch className="fea icon-ex-md icons"/>
                                                <input name="name" type="text" id="job-keyword" className="form-control filter-input-box bg-light border-0" placeholder="Search your keaywords"/>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="col-lg-3 col-md-6 col-12">
                                        <div className="mb-3">
                                            <label className="form-label fs-6">Select Categories :</label>
                                            <div className="filter-search-form position-relative filter-border bg-light">
                                                <FiHome className="fea icon-ex-md icons"/>
                                                <Select className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0" options={categories} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-3 col-md-6 col-12">
                                        <div className="mb-3">
                                            <label className="form-label fs-6">Min Price :</label>
                                            <div className="filter-search-form position-relative filter-border bg-light">
                                                <FiDollarSign className="fea icon-ex-md icons"/>
                                                <Select className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0" options={price} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-3 col-md-6 col-12">
                                        <div className="mb-3">
                                            <label className="form-label fs-6">Max Price :</label>
                                            <div className="filter-search-form position-relative filter-border bg-light">
                                                <FiDollarSign className="fea icon-ex-md icons"/>
                                                <Select className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0" options={price} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-3 col-md-6 col-12">
                                        <input type="submit" id="search" name="search" style={{height: '48px'}} className="btn btn-primary searchbtn w-100" value="Search"/>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>:''
                }
                    {activeIndex === 1 ? 
                    <div className="card border-0 active">
                        <form className="card-body text-start">
                            <div className="registration-form text-dark text-start">
                                <div className="row g-lg-0">
                                    <div className="col-lg-3 col-md-6 col-12">
                                        <div className="mb-3">
                                            <label className="form-label fs-6">Search :</label>
                                            <div className="filter-search-form position-relative filter-border">
                                                <FiSearch className="fea icon-ex-md icons"/>
                                                <input name="name" type="text" id="job-keyword" className="form-control filter-input-box bg-light border-0" placeholder="Search your keaywords"/>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="col-lg-3 col-md-6 col-12">
                                        <div className="mb-3">
                                            <label className="form-label fs-6">Select Categories:</label>
                                            <div className="filter-search-form position-relative filter-border bg-light">
                                                <FiHome className="fea icon-ex-md icons"/>
                                                <Select className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0" options={categories} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-3 col-md-6 col-12">
                                        <div className="mb-3">
                                            <label className="form-label fs-6">Min Price :</label>
                                            <div className="filter-search-form position-relative filter-border bg-light">
                                                <FiDollarSign className="fea icon-ex-md icons"/>
                                                <Select className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0" options={price} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-3 col-md-6 col-12">
                                        <div className="mb-3">
                                            <label className="form-label fs-6">Max Price :</label>
                                            <div className="filter-search-form position-relative filter-border bg-light">
                                                <FiDollarSign className="fea icon-ex-md icons"/>
                                                <Select className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0" options={price} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-3 col-md-6 col-12">
                                        <input type="submit" id="search" name="search" style={{height: '48px'}} className="btn btn-primary searchbtn w-100" value="Search"/>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>:''
                }
                    {activeIndex === 2 ? 
                    <div className="card border-0 active">
                        <form className="card-body text-start">
                            <div className="registration-form text-dark text-start">
                                <div className="row g-lg-0">
                                    <div className="col-lg-3 col-md-6 col-12">
                                        <div className="mb-3">
                                            <label className="form-label fs-6">Search :</label>
                                            <div className="filter-search-form position-relative filter-border">
                                                <FiSearch className="fea icon-ex-md icons"/>
                                                <input name="name" type="text" id="job-keyword" className="form-control filter-input-box bg-light border-0" placeholder="Search your keaywords"/>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="col-lg-3 col-md-6 col-12">
                                        <div className="mb-3">
                                            <label className="form-label fs-6">Select Categories:</label>
                                            <div className="filter-search-form position-relative filter-border bg-light">
                                                <FiHome className="fea icon-ex-md icons"/>
                                                <Select className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0" options={categories} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-3 col-md-6 col-12">
                                        <div className="mb-3">
                                            <label className="form-label fs-6">Min Price :</label>
                                            <div className="filter-search-form position-relative filter-border bg-light">
                                                <FiDollarSign className="fea icon-ex-md icons"/>
                                                <Select className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0" options={price} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-3 col-md-6 col-12">
                                        <div className="mb-3">
                                            <label className="form-label fs-6">Max Price :</label>
                                            <div className="filter-search-form position-relative filter-border bg-light">
                                                <FiDollarSign className="fea icon-ex-md icons"/>
                                                <Select className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0" options={price} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-3 col-md-6 col-12">
                                        <input type="submit" id="search" name="search" style={{height: '48px'}} className="btn btn-primary searchbtn w-100" value="Search"/>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>:''
                }
            </div>
        </div>
    )
}
