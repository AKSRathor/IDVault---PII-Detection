<a href = "https://youtu.be/m1XlggplRic" target="_blank">Video Link</a>

[![Watch the video](https://img.youtube.com/vi/m1XlggplRic/0.jpg)](https://youtu.be/m1XlggplRic)

<br/>
<a href = "https://www.canva.com/design/DAGQ1fJQOgw/60Cd5KHr-Szz_tFm8ioFEw/view?utm_content=DAGQ1fJQOgw&utm_campaign=designshare&utm_medium=link&utm_source=editor" target="_blank">Presentation Link</a>
<br/>
<p align="center">
 
![image](https://github.com/user-attachments/assets/1de01eb4-cba9-4554-8958-46e822121e3a)
 
</p>
<h1 align="center">IDVault</h1>
<h3 align="center">Trusted Protocol For Personal Documents Identification<h3>

<div align="center">
 </div>
 
## Problem Statement -
 - Develop a robust and efficient data discovery tool capable of identifying
   and classifying Personally Identifiable Information (PII) within diverse data
   repositories, including relational databases, cloud storage services (e.g.,
   Google Cloud Storage,Amazon S3) and file systems. The tool should
   accurately determine the presence and type of PII in each data point and
   subsequently, assess the associated risk level forthe entire database or
   object.

## Our Solution -
Our solution offers a robust and comprehensive approach to identifying, classifying, and assessing the risk of Personally Identifiable Information (PII) across diverse data repositories.

   - Regex Implementation: We implemented pre-defined regex scripts tailored for specific PII types, such as names, email addresses, credit/debit card information, phone numbers, and Aadhaar numbers. This    
     ensures highly accurate PII detection while minimizing false positives.

   - NLP Implementation: By leveraging advanced natural language processing (NLP) techniques, including pre-trained models, regular expressions, Named Entity Recognition (NER), and Spacy, we efficiently 
     identify and classify PII in unstructured text, enhancing the accuracy of detection for more complex data types.

   - PII Risk Assessment: Our tool performs a detailed PII risk assessment in compliance with GDPR, HIPAA, and PCI-DSS standards. PII is categorized into high, medium, and low sensitivity levels—high 
     sensitivity includes Aadhaar numbers and credit card details, medium covers driving license numbers and phone numbers, and low sensitivity includes full names, email addresses, IP addresses, and gender. 
     This allows for targeted risk mitigation based on the sensitivity of the data.

To present these capabilities, we built an intuitive web interface using React.js for the frontend and Python for the backend, offering a seamless and interactive user experience. For data storage and management, we leveraged AWS to host our SQL server, ensuring a scalable, secure infrastructure capable of handling large volumes of sensitive data.

This integrated system empowers users to efficiently detect, classify, and assess PII risks while ensuring regulatory compliance and secure data management, all through a user-friendly interface designed for ease of use and maximum performance.

  -------------------------------------
## Architecture
 <p align="center">
  <img src="https://github.com/user-attachments/assets/b5c475af-743d-4085-8805-367fce3dcca4">
 </p>
 
 ### Architecture Explaination
 Your flowchart outlines the process of PII detection and classification through both frontend (React) and backend (Python) systems:
 #### 1. Frontend (React):
   - **Authentication**: Users log in/register to access the system.
   - **Dashboard**: Provides options to:
   - **Raw Data Access**: Users can view PII content via AWS/GCP URL, share raw JSON data, or create tables dynamically for PII detection.
   - **Upload Data**: Users can upload CSV files for PII detection.

#### 2. Backend (Python):
  - **Data Loading**: Data is ingested in JSON, CSV, or SQL formats.
  - **Data Formatting**: Invalid data is converted to valid JSON format.
  - **Row-wise Processing**: Each row is processed in the format `"{Column_name}: + {Row_value}"`.
  - **PII Detection**: Using **Presidio**, **Spacy NLP**, and **Regex** to detect and classify PII.

#### 3. Return to Frontend:
  - The detected PII values are sent back to the frontend and displayed on the dashboard.

This setup ensures seamless PII detection, classification, and risk assessment across various data sources.

## About

### Vision
 <p align="center">
  <img src="https://github.com/user-attachments/assets/8219dc84-481a-4a11-a6a4-1cda343aa6cd">
 </p>

 ### Connect-AWS-SQL-SERVER
 <p align="center">
  <img src="https://github.com/user-attachments/assets/8cbab0a1-4809-4b16-8492-97f109eb1e01">
 </p>

 ### Fetching-Data-From-AWS-SQL-SERVER
 <p align="center">
  <img src="https://github.com/user-attachments/assets/b1964449-d9a1-4323-bbc7-34aa72b8d06e">
 </p>

 ### PII DETECTION
 <p align="center">
  <img src="https://github.com/user-attachments/assets/b1e2e547-fe78-4502-8aeb-c9e1327431b2">
 </p>

 ### Risk Score
 <p align="center">
  <img src="https://github.com/user-attachments/assets/97b7619e-c5fb-4fe6-93fe-e3a0a6b61eeb">
 </p>

  -------------------------------------
  ## Contributing
  - We're are open to enhancements & bug-fixes.
  - Feel free to add issues and submit patches.
  ## Authors
  - Rishabh Sharma - https://github.com/redhairrs
  - Ayush Kumar Singh Rathor - https://github.com/AKSRathor
