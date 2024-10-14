'use client'
import dynamic from "next/dynamic";
const Select = dynamic(()=>import('react-select'),{ssr:false})

import {FiDollarSign, FiHome,FiSearch} from "../../assets/icons/vander"

export default function SelectOne(){
    let categories = [
        { value: '1', label: 'Houses' },
        { value: '2', label: 'Apartment' },
        { value: '3', label: 'Offices' },
        { value: '4', label: 'Townhome' },
    ]
    let price = [
        { value: '1', label: '500' },
        { value: '1', label: '1000' },
        { value: '2', label: '2000' },
        { value: '3', label: '3000' },
        { value: '4', label: '4000' },
        { value: '5', label: '5000' },
        { value: '6', label: '6000' },
        { value: '7', label: '7000' },
    ]
    return(
        <>
        <form className="card-body text-start">
            <div className="registration-form text-dark text-start">
                <div className="row g-lg-0">
                    <div className="col-lg-3 col-md-6 col-12">
                        <div className="mb-lg-0 mb-3">
                            <div className="filter-search-form position-relative filter-border">
                                <FiSearch className="fea icon-ex-md icons"/>
                                <input name="name" type="text" id="job-keyword" className="form-control filter-input-box bg-light border-0" placeholder="Search your keaywords"/>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-lg-3 col-md-6 col-12">
                        <div className="mb-lg-0 mb-3">
                            <div className="filter-search-form position-relative filter-border bg-light">
                                <FiHome className="fea icon-ex-md icons"/>
                                <Select className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0" options={categories} />
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 col-12">
                        <div className="mb-lg-0 mb-3">
                            <div className="filter-search-form position-relative filter-border bg-light">
                                <FiDollarSign className="fea icon-ex-md icons"/>
                                <Select className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0" options={price} />
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 col-12">
                        <div>
                            <div className="filter-search-form position-relative filter-border bg-light">
                                <FiDollarSign className="fea icon-ex-md icons"/>
                                <Select className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0" options={price} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        </>
    )
}