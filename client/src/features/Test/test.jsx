import React, { Component } from 'react';
import ReactDOM from "react-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Header from '../../components/Header';
import Breadcrumbs from '../../components/Breadscrumbs';

function Test() {
    const handleGenerateCanvas = () => {
        html2canvas(document.body).then(function(canvas) {
          document.body.appendChild(canvas);
        });
      };
    
    const  handleDownloadImage = element => {
        const elementToDownload = document.getElementById("app");
        html2canvas(elementToDownload).then(function(canvas) {
          document.body.appendChild(canvas);
    
          const link = document.createElement("a");
          link.setAttribute("href", canvas.toDataURL("image/png"));
          link.setAttribute("download", "downloadedImage.png");
          document.body.appendChild(link);
          link.click();
        });
      };
    
    const  handleDownloadPDF = () => {
        html2canvas(document.body).then(function(canvas) {
          document.body.appendChild(canvas);
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF();
          pdf.addImage(imgData, "PNG", 0, 0);
          pdf.save("downloadedPdf.pdf");
        });
      };
    
        return (
          <div id="app" className="App">
              <Header/>
              <Breadcrumbs/>
            <h1 >Generating and downloading PDF/PNG</h1>
            <p id="superid">Hello, World!</p>
            <h3>Download PDF steps:</h3>
            <p>- use "html2Canvas" to generate a canvas</p>
            <p>- generate image/png using toDataURL function</p>
            <p>- use "jsPDF" library to add the image and download the PDF</p>
            <h3>Download PNG steps:</h3>
            <p>- use "html2Canvas" to generate a canvas</p>
            <p>- generate image/png using toDataURL function</p>
            <p>
              - create anchor element (a), append image data in "href" property and
              download PNG
            </p>
            <button onClick={handleGenerateCanvas}>Generate canvas</button>
            <button onClick={handleDownloadPDF}>Download PDF</button>
            <button onClick={handleDownloadImage}>Download Image</button>
            <h2>Canvas generated:</h2>
          </div>
        );
    }
    

export default Test;