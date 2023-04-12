import React from 'react'
import './style.css'

const Footer = () => {
  return (
    <div className="w-full px-8 pb-10 mb-10 fixed left-4 right-4 -bottom-24">
        <div className="flex flex-row items-start justify-evenly">
            <div className="col l-2-4 m-4 c-6">
                <h3 className="footer_heading">Chăm sóc khách hàng</h3>
                <ul className="footer-list">
                    <li className="footer-item">
                        <a href="" className="footer-item__link">Trung Tâm Trợ giúp</a>
                    </li>
                    <li className="footer-item">
                        <a href="" className="footer-item__link">Shopee Mail</a>
                    </li>
                    <li className="footer-item">
                        <a href="" className="footer-item__link">Hướng Dẫn Mua Hàng</a>
                    </li>
                </ul>
            </div>

            <div className="col l-2-4 m-4 c-6 col-config-mobile">
                <h3 className="footer_heading">Giới thiệu</h3>
                <ul className="footer-list">
                    <li className="footer-item">
                        <a href="" className="footer-item__link">Giới thiệu</a>
                    </li>
                    <li className="footer-item">
                        <a href="" className="footer-item__link">Tuyển dụng</a>
                    </li>
                    <li className="footer-item">
                        <a href="" className="footer-item__link">Điều khoản</a>
                    </li>
                </ul>
            </div>

            <div className="col l-2-4 m-4 c-6">
                <h3 className="footer_heading">Danh mục</h3>
                <ul className="footer-list">
                    <li className="footer-item">
                        <a href="" className="footer-item__link">Túi xách</a>
                    </li>
                    <li className="footer-item">
                        <a href="" className="footer-item__link">Bánh ngọt</a>
                    </li>
                    <li className="footer-item">
                        <a href="" className="footer-item__link">Balo Đen Basic</a>
                    </li>
                    <li className="footer-item">
                        <a href="" className="footer-item__link">New Arrival</a>
                    </li>
                    <li className="footer-item">
                        <a href="" className="footer-item__link">On Sale</a>
                    </li>
                </ul>
            </div>

            <div className="col l-2-4 m-4 c-6 col-config-mobile">
                <h3 className="footer_heading">Theo dõi</h3>
                <li className="footer-item">
                    <a href="" className="footer-item__link">
                        <i className="footer-item__link-icon fa-brands fa-facebook"></i>
                        FaceBook
                    </a>
                </li>
                <li className="footer-item">
                    <a href="" className="footer-item__link">
                        <i className="footer-item__link-icon fa-brands fa-instagram"></i>
                        Instagram
                    </a>
                </li>
                <li className="footer-item">
                    <a href="" className="footer-item__link">
                        <i className="footer-item__link-icon fa-brands fa-github"></i>
                        GitHug
                    </a>
                </li>
            </div>


        </div>
    </div>
  )
}

export default Footer
