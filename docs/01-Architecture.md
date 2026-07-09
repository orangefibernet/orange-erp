# OrangeERP v1.0
## ISP OSS/BSS Platform

Version: 1.0 (Draft)

---

# Vision

OrangeERP is a commercial-grade ISP ERP/OSS/BSS platform designed for Internet Service Providers.

The system manages:

- Customer Relationship Management (CRM)
- Subscriber Provisioning
- GPON Management
- Billing & Payments
- Inventory
- HR & Payroll
- Accounts
- Network Operations Center (NOC)
- Customer Portal
- Mobile Applications
- AI Assistant

---

# Technology Stack

Backend

- NestJS
- Prisma ORM
- PostgreSQL
- Redis
- BullMQ

Frontend

- React
- Tailwind CSS
- TypeScript

Infrastructure

- Docker
- Nginx
- Ubuntu
- GitHub

Network

- FreeRADIUS
- MikroTik
- Cisco BRAS
- ZTE OLT
- Huawei OLT
- SNMP

---

# Backend Architecture

Client

↓

REST API

↓

Authentication

↓

Business Modules

↓

BullMQ Queue

↓

Provisioning Processor

↓

Provisioning Engine

↓

Network Devices

↓

Database

---

# Core Modules

Authentication

Company

Customer

CRM

Subscription

Connection

Package

Billing

Payments

Inventory

HR

Accounts

IP Allocation

FreeRADIUS

Provisioning

Monitoring

Reports

AI Assistant

---

# Provisioning Flow

Create Connection

↓

Queue Job

↓

BullMQ

↓

Provisioning Processor

↓

Provisioning Engine

↓

Allocate IP

↓

Provision FreeRADIUS

↓

Configure MikroTik

↓

Configure Cisco

↓

Configure GPON

↓

Update Database

↓

Audit Log

---

# Supported Network Devices

Cisco ASR1002

Cisco ASR920

MikroTik CCR1009

ZTE C300

Huawei MA5600

FreeRADIUS

---

# Development Principles

Every feature must:

- Compile successfully
- Be documented
- Be logged
- Support rollback where required
- Follow clean architecture

---

# Version Roadmap

v0.5
Foundation

v0.6
Subscriber Provisioning

v0.7
GPON Automation

v0.8
Monitoring

v0.9
Customer Portal

v1.0
Production Release

---

# Current Sprint

Sprint 1

Real Subscriber Provisioning

Status:

In Progress