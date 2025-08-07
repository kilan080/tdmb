'use client'
import React, { useEffect, useState } from 'react';
import tmdbApi, { config } from '@/service/service_2';
import { useParams } from 'next/navigation';